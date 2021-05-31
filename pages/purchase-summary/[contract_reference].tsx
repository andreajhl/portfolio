import LoadingPage from "react-app/src/components/layouts/loading-page";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractWithPayments } from "react-app/src/components/pages/contract-with-payments";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: {
      contractReference: contract_reference
    }
  };
};

function ContractWithPaymentsPage({ contractReference }) {
  return (
    <>
      <CustomHead />
      <ContractWithPayments contractReference={contractReference} />
    </>
  );
}
export default withAuthenticationRequired(ContractWithPaymentsPage, {
  onRedirecting: () => <LoadingPage />
});
