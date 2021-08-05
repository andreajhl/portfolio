import { CLIENT_PROFILE } from "constants/paths";
import { useRedirectIfAuthenticatedOnMount } from "lib/famosos-auth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignUpPage } from "react-app/src/components/pages/sign-up";

function SignUp() {
  useRedirectIfAuthenticatedOnMount({ redirectTo: CLIENT_PROFILE });

  return (
    <>
      <CustomHead />
      <SignUpPage />
    </>
  );
}

export default SignUp;
