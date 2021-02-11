import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ContractCreatedPage } from "react-app/src/components/pages/contract-created";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: { contract_reference }
  };
};

const ContractCreated = ({ contract_reference }) => {
  return (
    <>
      <CustomHead />
      <ContractCreatedPage contractReference={contract_reference} />
    </>
  );
};

export default ContractCreated;
