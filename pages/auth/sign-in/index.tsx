import withoutAuth from "lib/withOutAuth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignInPage } from "react-app/src/components/pages/sign-in";

const SignIn = () => {
  return (
    <>
      <CustomHead />
      <SignInPage />
    </>
  );
};
export default withoutAuth(SignIn);
