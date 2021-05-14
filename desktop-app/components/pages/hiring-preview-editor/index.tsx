import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";
import useGetContract from "lib/hooks/useGetContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { useState } from "react";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

const HiringPreviewEditorPage = ({
  contractReference,
}: HiringPreviewEditorPageProps) => {
  const { contract } = useGetContract(contractReference, true); // utilizar endpoint privado.
  const [
    configuration,
    setConfiguration,
  ] = useState<HiringPreviewConfigurationType>({});

  return (
    <PageContainer showFooter={false}>
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
            <header className={styles.LivePreviewHeader}>
              <h2>Así lo verá {contract?.deliveryTo}</h2>
            </header>
            {configuration.cardMessage}
            {configuration.cardColor}
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export { HiringPreviewEditorPage };
