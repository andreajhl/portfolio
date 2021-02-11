import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { EditContractPage } from "react-app/src/components/pages/contract-editor";

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

export default HiringEditor;
