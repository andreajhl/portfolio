import { IS_UNAUTHORIZED_QUERY_PARAM } from "constants/paths";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ROOT_PATH } from "react-app/src/routing/Paths";

const HiringPreviewPage = dynamic<{
  contractReference: string;
  isUnauthorized: boolean;
}>(() =>
  import("react-app/src/components/pages/hiring-preview").then(
    (mod) => mod.HiringPreviewPage
  )
);

const DesktopHiringPreviewPage = dynamic<{
  contractReference: string;
  isUnauthorized: boolean;
}>(() =>
  import("desktop-app/components/pages/hiring-preview").then(
    (mod) => mod.HiringPreviewPage
  )
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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
      isMobile: isMobile(req.headers["user-agent"]),
      isUnauthorized: Boolean(query?.[IS_UNAUTHORIZED_QUERY_PARAM]),
    },
  };
};

function HiringPreview({ contractReference, isMobile, isUnauthorized }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopHiringPreviewPage
            contractReference={contractReference}
            isUnauthorized={isUnauthorized}
          />
        }
      >
        <HiringPreviewPage
          contractReference={contractReference}
          isUnauthorized={isUnauthorized}
        />
      </Maybe>
    </>
  );
}

export default HiringPreview;
