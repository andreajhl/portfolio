import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import isMobile from "lib/utils/isMobile";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";

const ClientHiringPage = dynamic(() =>
  import("react-app/src/components/pages/client-hiring").then(
    (mod) => mod.ClientHiringPage
  )
);

const DesktopClientHiringPage = dynamic(() =>
  import("desktop-app/components/pages/client-hiring").then(
    (mod) => mod.ClientHiringPage
  )
);

export const getServerSideProp = async ({ req }) => {
  return {
    props: { isMobile: isMobile(req.headers["user-agent"]) },
  };
};

const HiringPreview = ({ isMobile }) => {
  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<DesktopClientHiringPage />}>
        <ClientHiringPage />
      </Maybe>
    </>
  );
};
export default withAuthenticationRequired(HiringPreview, {
  onRedirecting: LoadingPage,
});
