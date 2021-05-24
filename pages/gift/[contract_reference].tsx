import { GiftPreviewPage } from "desktop-app/components/pages/gift-preview";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference, ...params },
  query: { previewMode },
}: GetServerSidePropsContext) => {
  return {
    props: { contract_reference, previewMode: Boolean(previewMode) },
  };
};

const GiftPreview = ({ contract_reference, previewMode }) => {
  useDesktopClass(true);
  return (
    <>
      <CustomHead />
      <GiftPreviewPage
        contractReference={contract_reference}
        previewMode={previewMode}
      />
    </>
  );
};

export default GiftPreview;
