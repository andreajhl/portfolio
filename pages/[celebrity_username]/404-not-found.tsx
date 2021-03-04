import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { FourZeroFourCelebrityProfile as FourZeroFourCelebrityProfileLayout } from "react-app/src/components/pages/404CelebrityProfile";
import { CELEBRITY_PROFILE } from "react-app/src/routing/Paths";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import { wrapper } from "react-app/src/state/store";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store }) => {
    await get(celebrity_username, true)(store.dispatch);

    const celebrity = store.getState().celebrities.getCelebrityReducer.data;
    if (celebrity.id) {
      return {
        redirect: {
          destination: CELEBRITY_PROFILE.replace(
            ":celebrity_username",
            String(celebrity_username)
          ),
          permanent: false
        }
      };
    }

    return {
      props: {
        celebrity_username
      }
    };
  }
);

const FourZeroFourCelebrityProfile = ({ celebrity_username }) => {
  return (
    <>
      <CustomHead
        title="Famoso no encontrado"
        description="No se encontró un famoso con este usuario"
      />
      <FourZeroFourCelebrityProfileLayout
        celebrityUsername={celebrity_username}
      />
    </>
  );
};

export default FourZeroFourCelebrityProfile;
