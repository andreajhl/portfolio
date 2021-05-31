import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { HiringPreviewPage } from "react-app/src/components/pages/hiring-preview";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference }
}) => {
  return {
    props: {
      contractReference: contract_reference
    }
  };
};

function HiringPreview({ contractReference }) {
  return (
    <>
      <CustomHead />
      <HiringPreviewPage contractReference={contractReference} />
    </>
  );
}

export default HiringPreview;
