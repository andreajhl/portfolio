import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { SubscribePage } from "react-app/src/components/pages/subscribir";
import { defineMessages, useIntl } from "react-intl";

const headData = defineMessages({
  titleClub: {
    defaultMessage: "Famosos.com - Club de fans de {celebrity_username}"
  },
  descriptionClub: {
    defaultMessage:
      "Club de fans de {celebrity_username} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
  }
});

const redirectToSanitizedPath = {
  destination: "/celebrity_username/club",
  permanent: false
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, store }) => {
    if (typeof params === "undefined") {
      return {
        redirect: redirectToSanitizedPath
      };
    }

    const celebrity_username = params?.celebrity_username;

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

const Club = ({ celebrity }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <CustomHead
        title={formatMessage(headData.titleClub, {
          celebrity_username: celebrity.fullName
        })}
        description={formatMessage(headData.descriptionClub, {
          celebrity_username: celebrity.fullName
        })}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <SubscribePage />
    </>
  );
};

export default withAuthenticationRequired(Club, {
  onRedirecting: LoadingPage
});
