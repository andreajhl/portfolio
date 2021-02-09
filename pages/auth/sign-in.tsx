import React from "react";
import CustomHead from "react-app/components/common/helpers/custom-head";
import { SignInPage } from "react-app/components/pages/sign-in";
import { PageContainer } from "react-app/components/layouts/page-container";
import { useFetchUser } from "../../lib/user";
import auth0 from "../../lib/auth0";

const Home = () => {
  const { user, loading } = useFetchUser();
  return (
    <>
      <PageContainer user={user} loading={loading}>
        <CustomHead />
        <SignInPage />
      </PageContainer>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  if (typeof window === "undefined") {
    const session = await auth0.getSession(req);
    if (session) {
      res.writeHead(302, {
        Location: "/"
      });
      res.end();
      return;
    }
    return { props: {} };
  }
}

export default Home;
