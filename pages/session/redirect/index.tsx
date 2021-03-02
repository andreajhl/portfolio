import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SessionRedirectPage } from "react-app/src/components/pages/session-redirect";

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query
    }
  };
};

const SessionRedirect = ({ query }) => {
  return (
    <>
      <CustomHead />
      <SessionRedirectPage query={query} />
    </>
  );
};

export default SessionRedirect;
