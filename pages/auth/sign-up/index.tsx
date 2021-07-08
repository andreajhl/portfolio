import withoutAuth from "lib/withOutAuth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignUpPage } from "react-app/src/components/pages/sign-up";

function SignUp() {
  return (
    <>
      <CustomHead />
      <SignUpPage />
    </>
  );
}
export default withoutAuth(SignUp);
