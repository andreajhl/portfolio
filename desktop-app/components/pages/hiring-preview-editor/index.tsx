import PageContainer from "desktop-app/components/layouts/page-container";
import styles from "./styles.module.scss";

type HiringPreviewEditorPageProps = {
  contractReference: string;
};

const HiringPreviewEditorPage = ({
  contractReference,
}: HiringPreviewEditorPageProps) => {
  return (
    <PageContainer showFooter={false}>
      <main className={styles.HiringPreviewEditorPage}>
        <div className="container">Hello</div>
      </main>
    </PageContainer>
  );
};

export { HiringPreviewEditorPage };
