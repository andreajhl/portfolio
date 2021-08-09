import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "constants/paths";
import React from "react";
import { HiringShareInWhatsappPage } from "desktop-app/components/pages/hiring-share-in-whatsapp";

export const getServerSideProps: GetServerSideProps = async ({
                                                               params
                                                             }: GetServerSidePropsContext) => {
  if (!params) {
    return {
      redirect: { destination: ROOT_PATH },
      props: {}
    };
  }

  return {
    props: {
      contractReference: params.contract_reference
    }
  };
};

function HiringShareInWhatsapp({ contractReference }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <HiringShareInWhatsappPage contractReference={contractReference} />
    </>
  );
}

export default withAuthenticationRequired(HiringShareInWhatsapp, {
  onRedirecting: LoaderLayout
});
