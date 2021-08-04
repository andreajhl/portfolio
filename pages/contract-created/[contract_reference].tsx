import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";
import { ROOT_PATH } from "react-app/src/routing/Paths";

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
  params,
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

const ContractCreated = ({ contractReference, isMobile }) => {
  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopContractCreatedPage contractReference={contractReference} />
        }
      >
        <ContractCreatedPage contractReference={contractReference} />
      </Maybe>
    </>
  );
};

export default withAuthenticationRequired(ContractCreated, {
  onRedirecting: () => <LoadingPage />,
});
