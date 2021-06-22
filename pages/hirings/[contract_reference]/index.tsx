import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ROOT_PATH } from "react-app/src/routing/Paths";

const HiringPreviewPage = dynamic<{
  contractReference: string;
}>(() =>
  import("react-app/src/components/pages/hiring-preview").then(
    (mod) => mod.HiringPreviewPage
  )
);

const DesktopHiringPreviewPage = dynamic<{
  contractReference: string;
}>(() =>
  import("desktop-app/components/pages/hiring-preview").then(
    (mod) => mod.HiringPreviewPage
  )
);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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
    },
  };
};

function HiringPreview({ contract_reference, isMobile }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopHiringPreviewPage contractReference={contract_reference} />
        }
      >
        <HiringPreviewPage contractReference={contract_reference} />
      </Maybe>
    </>
  );
}

export default HiringPreview;
