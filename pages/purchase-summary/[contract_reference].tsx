import React from "react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractWithPayments } from "react-app/src/components/pages/contract-with-payments";

const ContractWithPaymentsPage = () => {
  return (
    <>
      <CustomHead></CustomHead>
      <ContractWithPayments />
    </>
  );
};
export default withAuthenticationRequired(ContractWithPaymentsPage, {
  onRedirecting: () => <LoadingPage></LoadingPage>,
});
