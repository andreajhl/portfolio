import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { GetServerSideProps } from "next";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";
import { useDesktopClass } from "lib/hooks/useDesktopClass";

const ClientProfilePage = dynamic(() =>
  import("react-app/src/components/pages/client-profile").then(
    (mod) => mod.ClientProfilePage
  )
);
const DesktopClientProfilePage = dynamic(() =>
  import("desktop-app/components/pages/my-account").then(
    (mod) => mod.ClientProfilePage
  )
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

const Profile = ({ isMobile }) => {
  useDesktopClass(!isMobile);
  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<DesktopClientProfilePage />}>
        <ClientProfilePage />
      </Maybe>
    </>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: LoadingPage,
});
