import { GetServerSideProps, GetServerSidePropsContext } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "lib/famosos-auth";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import isMobile from "lib/utils/isMobile";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";

const DesktopHiringPreviewEditorPage = dynamic<{ contractReference: string }>(
  () =>
    import("desktop-app/components/pages/hiring-preview-editor").then(
      (mod) => mod.HiringPreviewEditorPage
    )
);

const MobileHiringPreviewEditorPage = dynamic<{ contractReference: string }>(
  () =>
    import("react-app/src/components/pages/hiring-preview-editor").then(
      (mod) => mod.HiringPreviewEditorPage
    )
);

export const getServerSideProps: GetServerSideProps = async ({
  params: { contract_reference },
  req,
}: GetServerSidePropsContext) => {
  return {
    props: {
      contract_reference,
      isMobile: isMobile(req?.headers?.["user-agent"]),
    },
  };
};

function HiringPreviewEditor({ contract_reference, isMobile }) {
  useDesktopClass(true);

  return (
    <>
      <CustomHead />
      <Maybe
        it={isMobile}
        orElse={
          <DesktopHiringPreviewEditorPage
            contractReference={contract_reference}
          />
        }
      >
        <MobileHiringPreviewEditorPage contractReference={contract_reference} />
      </Maybe>
    </>
  );
}

export default withAuthenticationRequired(HiringPreviewEditor, {
  onRedirecting: LoaderLayout,
});
