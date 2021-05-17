import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { HiringShareInWhatsappPage } from "desktop-app/components/pages/hiring-share-in-whatsapp";
import { useDesktopClass } from "lib/hooks/useDesktopClass";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
}: GetServerSidePropsContext) => {
  return {
    props: { contract_reference },
  };
};

const HiringShareInWhatsapp = ({ contract_reference }) => {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <HiringShareInWhatsappPage contractReference={contract_reference} />
    </>
  );
};

export default withAuthenticationRequired(HiringShareInWhatsapp, {
  onRedirecting: LoaderLayout,
});
