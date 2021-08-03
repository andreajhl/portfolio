import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PaymentMethodsPage } from "react-app/src/components/pages/payment-methods";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ValidateEmailModal } from "react-app/src/components/containers/validate-email-modal";

const PaymentMethods = () => {
  return (
    <>
      <CustomHead />
      <PaymentMethodsPage />
      <ValidateEmailModal />
    </>
  );
};

export default withAuthenticationRequired(PaymentMethods, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
