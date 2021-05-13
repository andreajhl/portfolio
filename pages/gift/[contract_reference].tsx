import { GiftPreviewPage } from "desktop-app/components/pages/gift-preview";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
}: GetServerSidePropsContext) => {
  return {
    props: { contract_reference },
  };
};

const GiftPreview = ({ contract_reference, pathname }) => {
  return (
    <>
      <CustomHead />
      <GiftPreviewPage contractReference={contract_reference} />
    </>
  );
};

export default GiftPreview;
