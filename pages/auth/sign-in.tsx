import React from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SignInPage } from "react-app/src/components/pages/sign-in";
import { PageContainer } from "react-app/src/components/layouts/page-container";

const Home = () => {
  return (
    <>
      <PageContainer>
        <CustomHead />
        <SignInPage />
      </PageContainer>
    </>
  );
};
export default Home;
