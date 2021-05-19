import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ProcessStripe3DFormPage } from "react-app/src/components/pages/stripe_3d_form";
import { history } from "react-app/src/routing/History";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
}) => {
  return {
    props: { contract_reference },
  };
};

const Iframe = ({ contract_reference }) => {
  return (
    <>
      <CustomHead />
      <ProcessStripe3DFormPage
        contractReference={contract_reference}
        history={history}
      />
    </>
  );
};

export default withAuthenticationRequired(Iframe, {
  onRedirecting: () => <LoadingPage />,
});
