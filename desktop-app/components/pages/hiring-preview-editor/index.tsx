import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import useGetContract from "lib/hooks/useGetContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { useState } from "react";
import { GiftPreviewMain } from "desktop-app/components/layouts/gift-preview-main";
import Maybe from "desktop-app/components/common/helpers/maybe";

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
              <div className={styles.LivePreviewCard}>
                <header className={styles.LivePreviewHeader}>
                  <h2>Así lo verá {contract?.deliveryTo}</h2>
                </header>
                <div
                  className={styles.LivePreviewBody}
                  style={{
                    backgroundImage: `url(${configuration.pageBackgroundUrl})`,
                  }}
                >
                  <GiftPreviewMain
                    className={styles.GiftPreview}
                    contract={contract}
                    hiringConfiguration={configuration}
                  />
                </div>
              </div>
              <button
                type="button"
                className={classes("btn btn-primary", styles.ShareButton)}
              >
                Enviar video a {contract.deliveryTo}
              </button>
            </div>
          </div>
        </main>
      </Maybe>
    </PageContainer>
  );
}

export { HiringPreviewEditorPage };
