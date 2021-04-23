import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { MyHiringsCardsSection } from "desktop-app/components/my-hirings/my-hirings-cards-section";
import styles from "./styles.module.scss";

function MyHirings() {
  return (
    <PageContainer>
      <PageHeading>Mis solicitudes</PageHeading>
      <main className={styles.MyHiringsMainContainer}>
        <MyHiringsCardsSection />
      </main>
    </PageContainer>
  );
}

export { MyHirings };
