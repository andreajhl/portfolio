import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { HiringPreviewPage } from "react-app/src/components/pages/hiring-preview";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false }
    };
  }

  return {
    props: {
      contractReference
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
