import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionSuccess as SubscriptionSuccessPage } from "react-app/src/components/pages/subscribe_success";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos."
  }
});

const SubscriptionSuccess = () => {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <SubscriptionSuccessPage />
    </>
  );
};

export default withAuthenticationRequired(SubscriptionSuccess, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
