import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";

const HiringPreviewPage = dynamic(() =>
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
  params: { contract_reference },
  req,
}) => {
  return {
    props: {
      contract_reference,
      isMobile: isMobile(req.headers["user-agent"]),
    },
  };
};

const HiringPreview = ({ contract_reference, isMobile }) => {
  useDesktopClass(!isMobile);

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopHiringPreviewPage contractReference={contract_reference} />
        }
      >
        <HiringPreviewPage />
      </Maybe>
    </>
  );
};

export default HiringPreview;
