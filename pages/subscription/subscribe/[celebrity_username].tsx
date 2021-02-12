import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { Subscription as SubscriptionPage } from "react-app/src/components/pages/subscription";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const Subscription = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionPage />
    </>
  );
};

export default withAuthenticationRequired(Subscription, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
