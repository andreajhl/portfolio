import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientSubscriptions } from "react-app/src/components/pages/client-subscriptions";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const Subscriptions = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <ClientSubscriptions />
    </>
  );
};
export default Subscriptions; /* withAuthenticationRequired(Subscriptions, {
  onRedirecting: () => <LoadingPage></LoadingPage>
}); */
