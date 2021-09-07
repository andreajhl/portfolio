import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import {
  CELEBRITY_PROFILE_ERROR,
  SUBSCRIPTION_FEED_VIEW_NAME,
} from "constants/paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscribePage } from "react-app/src/components/pages/subscribir";
import { defineMessages, useIntl } from "react-intl";
import { useRouter } from "next/router";

const headData = defineMessages({
  titleClub: {
    defaultMessage: "Famosos.com - Backstage de {celebrityFullName}",
  },
  descriptionClub: {
    defaultMessage:
      "Backstage de {celebrityFullName} en Famosos.com. ¡Suscríbete ahora y disfruta de beneficios exclusivos de {celebrityFullName}!",
  },
});

const redirectToSanitizedPath = {
  destination: "/celebrity_username/backstage",
  permanent: false,
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, store }) => {
    if (typeof params === "undefined") {
      return {
        redirect: redirectToSanitizedPath,
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
          permanent: false,
        },
      };
    }

    return {
      props: {
        celebrity,
      },
    };
  }
);

function Backstage({ celebrity }) {
  const { query } = useRouter();
  const viewName =
    query?.view_name?.toString?.() || SUBSCRIPTION_FEED_VIEW_NAME;
  const { formatMessage } = useIntl();

  return (
    <>
      <CustomHead
        title={formatMessage(headData.titleClub, {
          celebrityFullName: celebrity.fullName,
        })}
        description={formatMessage(headData.descriptionClub, {
          celebrityFullName: celebrity.fullName,
        })}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <SubscribePage viewName={viewName} />
    </>
  );
}

export default Backstage;
