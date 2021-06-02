import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";

const DesktopContractCreatedPage = dynamic<{ contractReference: any }>(() =>
  import("desktop-app/components/pages/contract-created").then(
    (mod) => mod.ContractCreated
  )
);

const ContractCreatedPage = dynamic<{ contractReference: any }>(() =>
  import("react-app/src/components/pages/contract-created").then(
    (mod) => mod.ContractCreatedPage
  )
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params: { contract_reference },
}) => {
  return {
    props: {
      contract_reference,
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

const ContractCreated = ({ contract_reference, isMobile }) => {
  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopContractCreatedPage contractReference={contract_reference} />
        }
      >
        <ContractCreatedPage contractReference={contract_reference} />
      </Maybe>
    </>
  );
};

export default withAuthenticationRequired(ContractCreated, {
  onRedirecting: () => <LoadingPage />,
});
