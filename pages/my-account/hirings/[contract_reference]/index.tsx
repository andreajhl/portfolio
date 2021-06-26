import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import useGlobalFetches from "lib/hooks/useGlobalFetches";

const DesktopClientHiringPage = dynamic<{ contractReference: string }>(() =>
  import("desktop-app/components/pages/client-hiring").then(
    (mod) => mod.ClientHiringPage
  )
);

const MobileClientHiringPage = dynamic<{ contractReference: string }>(() =>
  import("react-app/src/components/pages/client-hiring").then(
    (mod) => mod.ClientHiringPage
  )
);

export async function getServerSideProps({
  req,
  params: { contract_reference },
}) {
  return {
    props: {
      isMobile: isMobile(req.headers["user-agent"]),
      contractReference: contract_reference,
    },
  };
}

const HiringPreview = ({ isMobile, contractReference }) => {
  useDesktopClass(true);
  useGlobalFetches({
    shouldFetchUserCelebrityLikes: false,
    shouldFetchUserContractsLikes: true,
  });

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopClientHiringPage contractReference={contractReference} />
        }
      >
        <MobileClientHiringPage contractReference={contractReference} />
      </Maybe>
    </>
  );
};

export default withAuthenticationRequired(HiringPreview, {
  onRedirecting: LoadingPage,
});
