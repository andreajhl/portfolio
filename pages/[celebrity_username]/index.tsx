import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import {
  get,
  listPublicContractsV2,
  listReviewsV2,
} from "react-app/src/state/ducks/celebrities/actions";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import {
  getCelebrityProfileVersion,
  getProfileVersionDependingOnTime,
  setCelebrityProfileVersion,
} from "react-app/src/utils/celebrityProfileVersion";
import isMobileDevice from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import MicroDataTags from "react-app/src/components/common/helpers/micro-data-tags";
import getContractPrice from "react-app/src/utils/getContractPrice";
import {
  VIDEO_MESSAGE_PRODUCT_ID_PREFIX,
  GIFT_GIVING_CATEGORY_CODE,
} from "../../constants/dynamicAds";
import { useEffect } from "react";
import { defineMessages, useIntl } from "react-intl";
import { celebrityType } from "desktop-app/types/celebrityType";
import debug from "react-app/src/utils/debug";
import { CREATE_CONTRACT_QUERY_PARAM } from "constants/paths";
import { analytics } from "react-app/src/state/utils/gtm";
import {
  getCelebrityContractPrice,
  getCelebrityDiscountPercentage,
} from "lib/utils/celebrityUtils";
import getCelebrityBusinessPrice from "lib/utils/getCelebrityBusinessPrice";
import { CelebrityProfilePage } from "desktop-app/components/pages/celebrity-profile";

const headData = defineMessages({
  titleCelebrityProfile: {
    defaultMessage: "Famosos.com - {celebrity_username}",
  },
  descriptionCelebrityProfile: {
    defaultMessage:
      "Perfil oficial de {celebrity_username} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.",
  },
});

const redirectToSanitizedPath = {
  destination: "/celebrity_username",
  permanent: false,
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, store, req, query }) => {
    if (typeof params === "undefined") {
      return {
        redirect: redirectToSanitizedPath,
      };
    }
    try {
      const { celebrity_username } = params;
      const isMobile = isMobileDevice(req.headers["user-agent"]);
      await get(celebrity_username, false, true)(store.dispatch);
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

      await listReviewsV2(celebrity.username)(store.dispatch);
      await listPublicContractsV2(celebrity.username)(store.dispatch);

      let celebrityProfileVersion = getCelebrityProfileVersion(
        req?.headers?.cookie
      );
      if (!celebrityProfileVersion || celebrityProfileVersion === "A") {
        celebrityProfileVersion = getProfileVersionDependingOnTime();
      }

      return {
        props: {
          celebrity,
          celebrityProfileVersion,
          isMobile,
          shouldFocusCreateContractWizard: Boolean(
            query?.[CREATE_CONTRACT_QUERY_PARAM]
          ),
        },
      };
    } catch (error) {
      debug("ERROR getServerSideProps", error);
      return {
        props: {},
      };
    }
  }
);

type CelebrityProfileProps = {
  celebrity: celebrityType;
  celebrityProfileVersion: "B" | "C";
  isMobile: boolean;
  shouldFocusCreateContractWizard: boolean;
};

function CelebrityProfile({
  celebrity,
  celebrityProfileVersion,
  shouldFocusCreateContractWizard,
}: CelebrityProfileProps) {
  useDesktopClass(true);
  const videoMessagePrice = getContractPrice(celebrity.contractTypes) + ".00";
  const productId = VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrity.id;
  const celebrityCountry = celebrity?.countryCode;
  const celebrityCategory = celebrity?.categoryTitle;
  const { formatMessage } = useIntl();

  useEffect(() => {
    analytics.fbPixel("track", "ViewContent", {
      content_type: "product",
      content_ids: productId,
      celebrityCountry,
      celebrityCategory,
    });
  }, []);

  useEffect(() => {
    const profileVersionFromCookies = getCelebrityProfileVersion();
    if (profileVersionFromCookies && profileVersionFromCookies !== "A") return;
    setCelebrityProfileVersion(celebrityProfileVersion);
  }, [celebrityProfileVersion]);

  return (
    <>
      <CustomHead
        title={formatMessage(headData.titleCelebrityProfile, {
          celebrity_username: celebrity.fullName,
        })}
        description={formatMessage(headData.descriptionCelebrityProfile, {
          celebrity_username: celebrity.fullName,
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
        itemGroupId={celebrity?.categoryTitle}
      />
      <CelebrityProfilePage
        celebrity={celebrity}
        shouldFocusCreateContractWizard={shouldFocusCreateContractWizard}
        celebrityProfileVersion={celebrityProfileVersion}
      />
    </>
  );
}

export default CelebrityProfile;
