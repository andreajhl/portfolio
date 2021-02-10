import { useEffect } from "react";
import CustomHead from "react-app/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/components/pages/celebrities";
import getWindow from "react-app/utils/getWindow";
import auth0 from "../lib/auth0";

const Home = ({ token }) => {
  useEffect(() => {
    if (getWindow && token) {
      if (token) {
        localStorage.setItem("_a0_", token);
      }
    }
  }, []);
  return (
    <>
      <CustomHead />
      <CelebritiesPage />
    </>
  );
};

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (session) {
      const tokenCache = auth0.tokenCache(req, res);
      const { accessToken } = await tokenCache.getAccessToken();
      if (session) {
        return { props: { token: accessToken } };
      }
    }
  }

  return { props: {} };
}

export default Home;
