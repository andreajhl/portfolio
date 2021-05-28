import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionFeed } from "react-app/src/components/pages/subscription-feed";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos."
  }
});

const Feed = () => {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <SubscriptionFeed />
    </>
  );
};

export default withAuthenticationRequired(Feed, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
