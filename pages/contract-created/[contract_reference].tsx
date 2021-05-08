import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractCreatedPage } from "react-app/src/components/pages/contract-created";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const ContractCreated = () => {
  return (
    <>
      <CustomHead />
      <ContractCreatedPage />
    </>
  );
};
export default withAuthenticationRequired(ContractCreated, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
