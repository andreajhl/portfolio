import { IS_UNAUTHORIZED_QUERY_PARAM } from "constants/paths";
import { HiringPreviewPage } from "desktop-app/components/pages/hiring-preview";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ROOT_PATH } from "react-app/src/routing/Paths";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const contractReference = params?.contract_reference;

  if (typeof contractReference === "undefined") {
    return {
      redirect: { destination: ROOT_PATH, permanent: false },
    };
  }
  return {
    props: {
      contractReference,
      isUnauthorized: Boolean(query?.[IS_UNAUTHORIZED_QUERY_PARAM]),
    },
  };
};

function HiringPreview({ contractReference, isUnauthorized }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <HiringPreviewPage
        contractReference={contractReference}
        isUnauthorized={isUnauthorized}
      />
    </>
  );
}

export default HiringPreview;
