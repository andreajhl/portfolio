import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
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

const MyHirings = dynamic<{ query: { [key: string]: any } }>(() =>
  import("desktop-app/components/pages/my-hirings").then((mod) => mod.MyHirings)
);

export const getServerSideProps = async ({ req, query }) => {
  return {
    props: { isMobile: isMobile(req.headers["user-agent"]), query }
  };
};

function Hiring({ isMobile, query }) {
  useDesktopClass(!isMobile);
  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<MyHirings query={query} />}>
        <ClientHiringsPage />
      </Maybe>
    </>
  );
}

export default withAuthenticationRequired(Hiring, {
  onRedirecting: LoadingPage
});
