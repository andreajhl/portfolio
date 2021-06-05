import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { ROOT_PATH } from "constants/paths";
import React from "react";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";

const DesktopHiringShareInWhatsappPage = dynamic<{ contractReference: string }>(
  () =>
    import("desktop-app/components/pages/hiring-share-in-whatsapp").then(
      (mod) => mod.HiringShareInWhatsappPage
    )
);

const MobileHiringShareInWhatsappPage = dynamic<{ contractReference: string }>(
  () =>
    import("react-app/src/components/pages/hiring-share-in-whatsapp").then(
      (mod) => mod.HiringShareInWhatsappPage
    )
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext) => {
  if (!params) {
    return {
      redirect: { destination: ROOT_PATH },
      props: {},
    };
  }

  return {
    props: {
      contractReference: params.contract_reference,
      isMobile: isMobile(req?.headers?.["user-agent"]),
    },
  };
};

function HiringShareInWhatsapp({ contractReference, isMobile }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopHiringShareInWhatsappPage
            contractReference={contractReference}
          />
        }
      >
        <MobileHiringShareInWhatsappPage
          contractReference={contractReference}
        />
      </Maybe>
    </>
  );
}

export default withAuthenticationRequired(HiringShareInWhatsapp, {
  onRedirecting: LoaderLayout,
});
