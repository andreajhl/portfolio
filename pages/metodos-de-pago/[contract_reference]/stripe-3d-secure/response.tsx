import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ProcessStripe3DResponsePage } from "react-app/src/components/pages/stripe_3d_response";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params?.contract_reference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }
  return {
    props: { match: { params } },
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
  onRedirecting: () => <LoadingPage />,
});
