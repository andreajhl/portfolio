import PageContainer from "desktop-app/components/layouts/page-container";
import styles from "./styles.module.scss";

type SearchPageProps = {};

function SearchPage({ ...props }: SearchPageProps) {
  return (
    <PageContainer>
      <h1>Hello search</h1>
    </PageContainer>
  );
}

export { SearchPage };
