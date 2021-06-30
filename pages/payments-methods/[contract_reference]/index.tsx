import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PaymentMethodsPage } from "react-app/src/components/pages/payment-methods";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
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

const PaymentMethods = ({ contract_reference }) => {
  return (
    <>
      <CustomHead />
      <PaymentMethodsPage contractReference={contract_reference} />
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
