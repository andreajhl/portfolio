import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { SubscribePage } from "react-app/src/components/pages/subscribir";

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

    return {
      props: {
        celebrity
      }
    };
  }
);

const Subscribe = ({ celebrity }) => {
  return (
    <>
      <CustomHead
        title={`Famosos.com - Subscribirse a ${celebrity.fullName}`}
        description={`Subscribirse a ${celebrity.fullName} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.`}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <SubscribePage />
    </>
  );
};

export default withAuthenticationRequired(Subscribe, {
  onRedirecting: LoadingPage
});
