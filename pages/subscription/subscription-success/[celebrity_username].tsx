import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionSuccess as SubscriptionSuccessPage } from "react-app/src/components/pages/subscribe_success";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";
import { GetServerSideProps } from "next";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos.",
  },
});

const redirectToSanitizedPath = {
  destination: "/subscription/subscription-success/celebrity_username",
  permanent: false,
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params === "undefined") {
    return {
      redirect: redirectToSanitizedPath,
    };
  }

  const celebrityUsername = params?.celebrity_username;

  return {
    props: {
      celebrityUsername,
    },
  };
};

function SubscriptionSuccess({ celebrityUsername }) {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <SubscriptionSuccessPage celebrityUsername={celebrityUsername} />
    </>
  );
}

export default withAuthenticationRequired(SubscriptionSuccess, {
  onRedirecting: () => <LoadingPage />,
});
