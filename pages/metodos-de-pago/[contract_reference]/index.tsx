import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PaymentMethodsPage } from "react-app/src/components/pages/payment-methods";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ROOT_PATH } from "react-app/src/routing/Paths";

const PaymentMethods = () => {
  return (
    <>
      <CustomHead />
      <PaymentMethodsPage />
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
