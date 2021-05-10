import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { HiringPreviewEditorPage } from "desktop-app/components/pages/hiring-preview-editor";

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
}: GetServerSidePropsContext) => {
  return {
    props: { contract_reference },
  };
};

const HiringPreviewEditor = ({ contract_reference, pathname }) => {
  return (
    <>
      <CustomHead />
      <HiringPreviewEditorPage contractReference={contract_reference} />
    </>
  );
};

export default withAuthenticationRequired(HiringPreviewEditor, {
  onRedirecting: LoaderLayout,
});
