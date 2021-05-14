import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import dynamic from "next/dynamic";
import isMobile from "lib/utils/isMobile";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";

const ClientHiringsPage = dynamic(() =>
  import("react-app/src/components/pages/client-hirings").then(
    (mod) => mod.ClientHiringsPage
  )
);

const MyHirings = dynamic(() =>
  import("desktop-app/components/pages/my-hirings").then((mod) => mod.MyHirings)
);

export const getServerSideProps = async ({ req }) => {
  return {
    props: { isMobile: isMobile(req.headers["user-agent"]) },
  };
};

function Hiring({ isMobile }) {
  useDesktopClass(!isMobile);
  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<MyHirings />}>
        <ClientHiringsPage />
      </Maybe>
    </>
  );
}

export default withAuthenticationRequired(Hiring, {
  onRedirecting: LoadingPage,
});
