import { HelpCard } from "desktop-app/components/hiring-preview-editor/help-card";
import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { EditorForm } from "desktop-app/components/hiring-preview-editor/editor-form";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

const HiringPreviewEditorPage = ({
  contractReference,
}: HiringPreviewEditorPageProps) => {
  return (
    <PageContainer showFooter={false}>
      <main className={styles.HiringPreviewEditorPage}>
        <div className={classes("container", styles.Container)}>
          <div className={styles.LeftSide}>
            <HelpCard deliveryTo="Ana" />
            <EditorForm />
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export { HiringPreviewEditorPage };
