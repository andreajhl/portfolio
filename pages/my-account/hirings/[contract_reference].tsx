import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientHiringPage } from "react-app/src/components/pages/client-hiring";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";

const HiringPreview = () => {
  return (
    <>
      <CustomHead />
      <ClientHiringPage />
    </>
  );
};
export default withAuthenticationRequired(HiringPreview, {
  onRedirecting: () => <LoaderLayout></LoaderLayout>
});
