import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { Subscription as SubscriptionPage } from "react-app/src/components/pages/subscription";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";
import { GetServerSideProps } from "next";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos.",
  },
});

const redirectToSanitizedPath = {
  destination: "/subscription/subscribe/celebrity_username",
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

function Subscription({ celebrityUsername }) {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <SubscriptionPage celebrityUsername={celebrityUsername} />
    </>
  );
}

export default withAuthenticationRequired(Subscription, {
  onRedirecting: () => <LoadingPage />,
});
