import { CLIENT_PROFILE } from "constants/paths";
import { useRedirectIfAuthenticatedOnMount } from "lib/famosos-auth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignUpFromPage } from "react-app/src/components/pages/sign-up-from";

export const getServerSideProps = async ({ query }) => {
  return { props: { query } };
};

function SignUpFrom({ query }) {
  useRedirectIfAuthenticatedOnMount({ redirectTo: CLIENT_PROFILE });

  return (
    <>
      <CustomHead />
      <SignUpFromPage query={query} />
    </>
  );
}

export default SignUpFrom;
