import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ProcessStripe3DResponsePage } from "react-app/src/components/pages/stripe_3d_response";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: { match: { params } }
  };
};

const Response = ({ match }) => {
  return (
    <>
      <CustomHead />
      <ProcessStripe3DResponsePage match={match} />
    </>
  );
};

export default withAuthenticationRequired(Response, {
  onRedirecting: () => <LoadingPage />
});
