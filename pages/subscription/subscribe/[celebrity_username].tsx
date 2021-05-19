import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { Subscription as SubscriptionPage } from "react-app/src/components/pages/subscription";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos.",
  },
});
const Subscription = () => {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <SubscriptionPage />
    </>
  );
};

export default withAuthenticationRequired(Subscription, {
  onRedirecting: () => <LoadingPage></LoadingPage>,
});
