import { useEffect } from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientProfilePage } from "react-app/src/components/pages/client-profile";
import auth0 from "../../lib/auth0";
import { LOGIN_API_ROUTE } from "../../contants/paths";
import isBrowser from "react-app/src/utils/isBrowser";
import { Session } from "react-app/src/state/utils/session";

export async function getServerSideProps({ req, res }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: LOGIN_API_ROUTE
      });
      res.end();
      return;
    }
    return { props: { session: session } };
  }
}

const Profile = ({ session }) => {
  useEffect(() => {
    const sessionInstance = new Session();
    localStorage.setItem(sessionInstance.sessionName, session.idToken);
  }, [session]);
  isBrowser;
  return (
    <>
      <CustomHead />
      <ClientProfilePage />
    </>
  );
};

export default Profile;
