import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionSuccess as SubscriptionSuccessPage } from "react-app/src/components/pages/subscribe_success";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const SubscriptionSuccess = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionSuccessPage />
    </>
  );
};

export default withAuthenticationRequired(SubscriptionSuccess, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
