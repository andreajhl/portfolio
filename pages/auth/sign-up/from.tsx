import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignUpFromPage } from "react-app/src/components/pages/sign-up-from";

export const getServerSideProps = async ({ query }) => {
  return { props: { query } };
};

function SignUpFrom({ query }) {
  return (
    <>
      <CustomHead />
      <SignUpFromPage query={query} />
    </>
  );
}
export default SignUpFrom;
