import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import {
  get,
  listPublicContracts,
  listReviews,
  setCelebrityProfileVersion
} from "react-app/src/state/ducks/celebrities/actions";
import { CelebrityProfilePage } from "react-app/src/components/pages/celebrity-profile";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { getProfileVersionDependingOnTime } from "react-app/src/utils/celebrityProfileVersion";
import MicroDataTags from "react-app/src/components/common/helpers/micro-data-tags";
import getContractPrice from "react-app/src/utils/getContractPrice";
import {
  VIDEO_MESSAGE_PRODUCT_ID_PREFIX,
  GIFT_GIVING_CATEGORY_CODE
} from "../../constants/dynamicAds";
import { useEffect } from "react";
import waitFor from "react-app/src/utils/waitFor";
import debug from "react-app/src/utils/debug";
import { defineMessages, useIntl } from "react-intl";

const headData = defineMessages({
  titleCelebrityProfile: {
    defaultMessage: "Famosos.com - {celebrity_username}"
  },
  descriptionCelebrityProfile: {
    defaultMessage:
      "Perfil oficial de {celebrity_username} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
  }
});

const redirectToSanitizedPath = {
  destination: "/celebrity_username",
  permanent: false
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, store }) => {
    if (typeof params === "undefined") {
      return {
        redirect: redirectToSanitizedPath
      };
    }
    try {
      const celebrity_username = params?.celebrity_username;
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
            permanent: false
          }
        };
      }
      store.dispatch(
        setCelebrityProfileVersion(getProfileVersionDependingOnTime())
      );
      await listPublicContracts(celebrity.id, { currentPage: 1 })(
        store.dispatch
      );
      await listReviews(celebrity.id, { currentPage: 1 })(store.dispatch);

      return {
        props: {
          celebrity
        }
      };
    } catch (error) {
      debug("ERROR getServerSideProps", error);
      return {
        props: {}
      };
    }
  }
);

function CelebrityProfile({ celebrity }) {
  const videoMessagePrice = getContractPrice(celebrity.contractTypes) + ".00";
  const productId = VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrity.id;
  const { formatMessage } = useIntl();

  useEffect(() => {
    async function captureProfileViewEvent() {
      const fbq = await waitFor(() => (window as any)?.fbq);
      if (typeof fbq !== "function") return;
      fbq("track", "ViewContent", {
        content_type: "product",
        content_ids: productId
      });
    }
    captureProfileViewEvent();
  }, []);

  return (
    <>
      <CustomHead
        title={formatMessage(headData.titleCelebrityProfile, {
          celebrity_username: celebrity.fullName
        })}
        description={formatMessage(headData.descriptionCelebrityProfile, {
          celebrity_username: celebrity.fullName
        })}
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
      <CelebrityProfilePage celebrity={celebrity} />
    </>
  );
}

export default CelebrityProfile;
