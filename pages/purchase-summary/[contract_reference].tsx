import LoadingPage from "react-app/src/components/layouts/loading-page";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractWithPayments } from "react-app/src/components/pages/contract-with-payments";
import { GetServerSideProps } from "next";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }
  return {
    props: {
      contractReference,
    },
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
  onRedirecting: () => <LoadingPage />,
});
