import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { EditContractPage } from "react-app/src/components/pages/contract-editor";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
  resolvedUrl: pathname
}: GetServerSidePropsContext) => {
  return {
    props: { contract_reference, pathname }
  };
};

const HiringEditor = ({ contract_reference, pathname }) => {
  return (
    <>
      <CustomHead />
      <EditContractPage
        contract_reference={contract_reference}
        pathname={pathname}
      />
    </>
  );
};

export default withAuthenticationRequired(HiringEditor, {
  onRedirecting: () => <LoaderLayout></LoaderLayout>
});
