import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientSubscriptions } from "react-app/src/components/pages/client-subscriptions";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";

const Subscriptions = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <ClientSubscriptions />
    </>
  );
};
export default withAuthenticationRequired(Subscriptions, {
  onRedirecting: () => <LoaderLayout></LoaderLayout>
});
