import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { EditContractPage } from "react-app/src/components/pages/contract-editor";
import { withAuthenticationRequired } from "lib/famosos-auth";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({
                                                               params,
                                                               resolvedUrl: pathname
                                                             }: GetServerSidePropsContext) => {
  const contract_reference = params?.contract_reference;

  if (typeof contract_reference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false }
    };
  }

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
