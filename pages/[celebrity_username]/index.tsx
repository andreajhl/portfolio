import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import {
  get,
  listPublicContracts
} from "react-app/src/state/ducks/celebrities/actions";
import { CelebrityProfilePage } from "react-app/src/components/pages/celebrity-profile";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store }) => {
    await get(celebrity_username, true)(store.dispatch);

    const celebrity = store.getState().celebrities.getCelebrityReducer.data;
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
    await listPublicContracts(celebrity.id, { currentPage: 1 })(store.dispatch);
    return {
      props: {
        celebrity
      }
    };
  }
);

const CelebrityProfile = ({ celebrity }) => {
  return (
    <>
      <CustomHead
        title={`Famosos.com - ${celebrity.fullName}`}
        description={`Perfil oficial de ${celebrity.fullName} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.`}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <CelebrityProfilePage celebrity={celebrity} />
    </>
  );
};

export default CelebrityProfile;
