import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientHiringsPage } from "react-app/src/components/pages/client-hirings";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const Hiring = () => {
  return (
    <>
      <CustomHead />
      <ClientHiringsPage />
    </>
  );
};

export default withAuthenticationRequired(Hiring, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
