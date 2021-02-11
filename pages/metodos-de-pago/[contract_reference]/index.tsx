import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PaymentMethodsPage } from "react-app/src/components/pages/payment-methods";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: { contract_reference }
  };
};

const PaymentMethods = ({ contract_reference }) => {
  return (
    <>
      <CustomHead />
      <PaymentMethodsPage contractReference={contract_reference} />
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoaderLayout></LoaderLayout>
});
