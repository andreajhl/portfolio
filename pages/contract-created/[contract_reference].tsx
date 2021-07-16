import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractCreatedPage } from "react-app/src/components/pages/contract-created";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false }
    };
  }
  return {
    props: {
      contractReference
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
