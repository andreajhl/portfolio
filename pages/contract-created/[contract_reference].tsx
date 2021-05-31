import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractCreatedPage } from "react-app/src/components/pages/contract-created";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: {
      contractReference: contract_reference
    }
  };
};

function ContractCreated({ contractReference }) {
  return (
    <>
      <CustomHead />
      <ContractCreatedPage contractReference={contractReference} />
    </>
  );
}

export default withAuthenticationRequired(ContractCreated, {
  onRedirecting: () => <LoadingPage />
});
