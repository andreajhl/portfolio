import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import useGetContract from "lib/hooks/useGetContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { LivePreviewCard } from "desktop-app/components/hiring-preview-editor/live-preview-card";
import { ShareGiftDropdown } from "desktop-app/components/common/widgets/share-gift-dropdown";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

function HiringPreviewEditorPage({
  contractReference,
}: HiringPreviewEditorPageProps) {
  const { contract } = useGetContract(contractReference, true); // utilizar endpoint privado.
  const [
    configuration,
    setConfiguration,
  ] = useState<HiringPreviewConfigurationType>({});

  return (
    <PageContainer showFooter={false}>
      <Maybe it={Boolean(contract.reference)}>
        <main className={styles.HiringPreviewEditorPage}>
          <div className={classes("container", styles.Container)}>
            <div className={styles.LeftSide}>
              <EditorForm
                contractReference={contractReference}
                occasion={contract?.occasion}
                onChange={setConfiguration}
              />
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
