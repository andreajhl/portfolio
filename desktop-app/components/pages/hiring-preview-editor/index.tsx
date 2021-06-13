import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import useGetUserContract from "lib/hooks/useGetUserContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { LivePreviewCard } from "desktop-app/components/hiring-preview-editor/live-preview-card";
import { ShareGiftDropdown } from "desktop-app/components/common/widgets/share-gift-dropdown";
import useGetHiringPreviewConfiguration from "lib/hooks/useGetHiringPreviewConfiguration";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

function HiringPreviewEditorPage({
  contractReference,
}: HiringPreviewEditorPageProps) {
  const { contract } = useGetUserContract(contractReference, true);
  const {
    hiringPreviewConfiguration,
    status: hiringPreviewConfigurationStatus,
  } = useGetHiringPreviewConfiguration(contractReference);
  const [
    configuration,
    setConfiguration,
  ] = useState<HiringPreviewConfigurationType>({});

  const hiringPreviewConfigurationIsCompleted =
    hiringPreviewConfigurationStatus === "completed";

  return (
    <PageContainer showFooter={false}>
      <Maybe it={Boolean(contract.reference)}>
        <main className={styles.HiringPreviewEditorPage}>
          <div className={classes("container", styles.Container)}>
            <div className={styles.LeftSide}>
              <Maybe it={hiringPreviewConfigurationIsCompleted}>
                <EditorForm
                  contractReference={contractReference}
                  occasion={contract?.occasion}
                  hiringPreviewConfiguration={hiringPreviewConfiguration}
                  onChange={setConfiguration}
                />
              </Maybe>
            </div>
            <div className={styles.RightSide}>
              <LivePreviewCard
                contract={contract}
                configuration={configuration}
              />
              <ShareGiftDropdown
                deliveryTo={contract.deliveryTo}
                contractReference={contractReference}
                menuPosition="bottom center"
                buttonClassName={classes("btn btn-primary", styles.ShareButton)}
                buttonChildren={`Enviar video a ${contract.deliveryTo}`}
              />
            </div>
          </div>
        </main>
      </Maybe>
    </PageContainer>
  );
}

export { HiringPreviewEditorPage };
