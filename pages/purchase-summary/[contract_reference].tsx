import LoadingPage from "react-app/src/components/layouts/loading-page";
import { useAuth, withAuthenticationRequired } from "lib/famosos-auth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

import { GetServerSideProps } from "next";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import isMobile from "lib/utils/isMobile";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import useUserData from "lib/hooks/useUserData";
import { useEffect } from "react";

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
  const { user } = useAuth();
  const { fetchUserData } = useUserData();
  useDesktopClass(!isMobile);

  // To update user data and its stars if is already fetched .
  useEffect(() => {
    if (!user) return;
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
