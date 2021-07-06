import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { ROOT_PATH } from "constants/paths";
import { HiringShareInMailPage } from "desktop-app/components/pages/hiring-share-in-mail";

export const getServerSideProps: GetServerSideProps = async ({
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
    },
  };
};

function HiringShareInMail({ contractReference }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <HiringShareInMailPage contractReference={contractReference} />
    </>
  );
}

export default withAuthenticationRequired(HiringShareInMail, {
  onRedirecting: LoaderLayout,
});
