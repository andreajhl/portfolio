import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import {
  get,
  listPublicContracts,
  listReviews,
  setCelebrityProfileVersion,
} from "react-app/src/state/ducks/celebrities/actions";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { getProfileVersionDependingOnTime } from "react-app/src/utils/celebrityProfileVersion";
import isMobile from "lib/utils/isMobile";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import MicroDataTags from "react-app/src/components/common/helpers/micro-data-tags";
import getContractPrice from "react-app/src/utils/getContractPrice";
import {
  VIDEO_MESSAGE_PRODUCT_ID_PREFIX,
  GIFT_GIVING_CATEGORY_CODE,
} from "../../constants/dynamicAds";
import { useEffect } from "react";
import waitFor from "react-app/src/utils/waitFor";

const CelebrityProfilePage = dynamic<{ celebrity: any }>(() =>
  import("react-app/src/components/pages/celebrity-profile").then(
    (mod) => mod.CelebrityProfilePage
  )
);

const CelebrityProfilePageDesktop = dynamic<{ celebrity: any }>(() =>
  import("desktop-app/components/pages/celebrity-profile").then(
    (mod) => mod.CelebrityProfilePage
  )
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store, req }) => {
    await get(celebrity_username, true)(store.dispatch);

    const { celebrities } = store.getState();
    const celebrity = celebrities.getCelebrityReducer.data;
    if (!celebrity.id) {
      return {
        redirect: {
          destination: CELEBRITY_PROFILE_ERROR.replace(
            ":celebrity_username",
            String(celebrity_username)
          ),
          permanent: false,
        },
      };
    }

    store.dispatch(
      setCelebrityProfileVersion(getProfileVersionDependingOnTime())
    );

    await listPublicContracts(celebrity.id, { currentPage: 1 })(store.dispatch);
    await listReviews(celebrity.id, { currentPage: 1 })(store.dispatch);

    return {
      props: {
        celebrity,
        isMobile: isMobile(req.headers["user-agent"]),
      },
    };
  }
);

function CelebrityProfile({ celebrity, isMobile }) {
  useDesktopClass(!isMobile);
  const videoMessagePrice = getContractPrice(celebrity.contractTypes) + ".00";
  const productId = VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrity.id;

  useEffect(() => {
    async function captureProfileViewEvent() {
      const fbq = await waitFor(() => (window as any)?.fbq);
      if (typeof fbq !== "function") return;
      fbq("track", "ViewContent", {
        content_type: "product",
        content_ids: productId,
      });
    }
    captureProfileViewEvent();
  }, []);

  return (
    <>
      <CustomHead
        title={`Famosos.com - ${celebrity.fullName}`}
        description={`Perfil oficial de ${celebrity.fullName} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.`}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <MicroDataTags
        productId={productId}
        priceAmount={videoMessagePrice}
        productAvailability={
          celebrity.status === 50 ? "available for order" : "out of stock"
        }
        productCategory={GIFT_GIVING_CATEGORY_CODE}
      />
      <Maybe
        it={isMobile}
        orElse={<CelebrityProfilePageDesktop celebrity={celebrity} />}
      >
        <CelebrityProfilePage celebrity={celebrity} />
      </Maybe>
    </>
  );
}

export default CelebrityProfile;
