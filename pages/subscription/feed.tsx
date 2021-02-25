import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionFeed } from "react-app/src/components/pages/subscription-feed";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
const Feed = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionFeed />
    </>
  );
};

export default withAuthenticationRequired(Feed, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
