import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientHiringPage } from "react-app/src/components/pages/client-hiring";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const HiringPreview = () => {
  return (
    <>
      <CustomHead />
      <ClientHiringPage />
    </>
  );
};
export default withAuthenticationRequired(HiringPreview, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
