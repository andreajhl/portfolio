import withoutAuth from "lib/withOutAuth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignInFromPage } from "react-app/src/components/pages/sign-in-from";

export const getServerSideProps = async ({ query }) => {
  return { props: { query } };
};

function SignInFrom({ query }) {
  return (
    <>
      <CustomHead />
      <SignInFromPage query={query} />
    </>
  );
}

export default withoutAuth(SignInFrom);
