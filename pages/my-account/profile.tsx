import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientProfilePage } from "react-app/src/components/pages/client-profile";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const Profile = () => {
  return (
    <>
      <CustomHead />
      <ClientProfilePage />
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
