import { useEffect, useState } from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
import isBrowser from "react-app/src/utils/isBrowser";
import auth0 from "../lib/auth0";

const Home = ({ token, session }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (isBrowser && token) {
      console.log(token, "token");
      console.log(session, "session");
      if (token) {
        localStorage.setItem("_a0_", token);
      }
    }
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
