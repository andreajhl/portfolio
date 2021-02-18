import React from "react";
import { GetServerSideProps } from "next";

import LoadingPage from "react-app/src/components/layouts/loading-page";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractWithPayments } from "react-app/src/components/pages/contract-with-payments";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: { contract_reference }
  };
};

const ContractWithPaymentsPage = ({ contract_reference }) => {
  return (
    <>
      <CustomHead></CustomHead>
      <ContractWithPayments contractReference={contract_reference} />
    </>
  );
};
export default withAuthenticationRequired(ContractWithPaymentsPage, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
