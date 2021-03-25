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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store }) => {
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

    await listPublicContracts(celebrity.id, { currentPage: 1 })(store.dispatch);
    await listReviews(celebrity.id, { currentPage: 1 })(store.dispatch);

    return {
      props: {
        celebrity
      }
    };
  }
);

const GIFT_GIVING_CATEGORY_CODE = "2559";

const CelebrityProfile = ({ celebrity }) => {
  const videoMessagePrice = getContractPrice(celebrity.contractTypes) + ".00";

  return (
    <>
      <CustomHead
        title={`Famosos.com - ${celebrity.fullName}`}
        description={`Perfil oficial de ${celebrity.fullName} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.`}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <MicroDataTags
        productId={"VIDEO_MESSAGE_" + celebrity.id}
        priceAmount={videoMessagePrice}
        productAvailability={
          celebrity.status === 50 ? "available for order" : "out of stock"
        }
        productCategory={GIFT_GIVING_CATEGORY_CODE}
      />
      <CelebrityProfilePage celebrity={celebrity} />
    </>
  );
};

export default CelebrityProfile;
