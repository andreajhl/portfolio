import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import useGetUserContract from "lib/hooks/useGetUserContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ShareGiftDropdown } from "desktop-app/components/common/widgets/share-gift-dropdown";
import { PageContainer } from "../../layouts/page-container";
import ViewerClientVideo from "desktop-app/components/common/cards/viewer-client-video";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

function HiringPreviewEditorPage({
  contractReference,
}: HiringPreviewEditorPageProps) {
  const { contract } = useGetUserContract(contractReference, true);
  const [
    configuration,
    setConfiguration,
  ] = useState<HiringPreviewConfigurationType>({});

  return (
    <PageContainer showFooter={false} showSearch={false}>
      <Maybe it={Boolean(contract.reference)}>
        <main
          className={styles.HiringPreviewEditorPage}
          style={{ backgroundImage: `url(${configuration.pageBackgroundUrl})` }}
        >
          <div className={classes("container", styles.Container)}>
            <div className={styles.LeftSide}>
              <EditorForm
                contractReference={contractReference}
                occasion={contract?.occasion}
                onChange={setConfiguration}
              />
            </div>
            <div className={styles.RightSide}>
              <ViewerClientVideo
                avatar={contract?.celebrityData?.avatar}
                fullName={contract?.celebrityData?.fullName}
                username={contract?.celebrityData?.username}
                videoUrl={contract?.media}
                videoPosterUrl={contract?.celebrityData?.avatar}
              />
              <ShareGiftDropdown
                deliveryTo={contract.deliveryTo}
                contractReference={contractReference}
                menuPosition="bottom center"
                buttonClassName={classes("btn btn-primary", styles.ShareButton)}
                buttonChildren={`Enviar a ${contract.deliveryTo}`}
              />
            </div>
          </div>
        </main>
      </Maybe>
    </PageContainer>
  );
}

export { HiringPreviewEditorPage };
