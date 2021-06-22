import LoadingPage from "react-app/src/components/layouts/loading-page";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

import { GetServerSideProps } from "next";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import isMobile from "lib/utils/isMobile";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";

const DesktopContractCreatedPage = dynamic<{ contractReference: any }>(() =>
  import("desktop-app/components/pages/contract-created").then(
    (mod) => mod.ContractCreated
  )
);

const ContractWithPayments = dynamic<{ contractReference: any }>(() =>
  import("react-app/src/components/pages/contract-with-payments").then(
    (mod) => mod.ContractWithPayments
  )
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }
  return {
    props: {
      contractReference,
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

function ContractWithPaymentsPage({ contractReference, isMobile }) {
  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopContractCreatedPage contractReference={contractReference} />
        }
      >
        <ContractWithPayments contractReference={contractReference} />
      </Maybe>
    </>
  );
}
export default withAuthenticationRequired(ContractWithPaymentsPage, {
  onRedirecting: () => <LoadingPage />,
});
