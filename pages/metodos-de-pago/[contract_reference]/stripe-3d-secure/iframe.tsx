import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ProcessStripe3DFormPage } from "react-app/src/components/pages/stripe_3d_form";
import { history } from "react-app/src/routing/History";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const contract_reference = params?.contract_reference;

  if (typeof contract_reference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false }
    };
  }

  return {
    props: { contract_reference }
  };
};

const Iframe = ({ contract_reference }) => {
  return (
    <>
      <CustomHead />
      <ProcessStripe3DFormPage
        contract_reference={contract_reference}
        history={history}
      />
    </>
  );
};

export default withAuthenticationRequired(Iframe, {
  onRedirecting: () => <LoadingPage />
});
