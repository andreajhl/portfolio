import HeroSection from "desktop-app/components/home/hero-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { Button } from "react-bootstrap";
import styles from "./styles.module.scss";

function HomePage() {
  return (
    <PageContainer>
      <HeroSection />
      <section className={"mb-5" + " " + styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Paleta de colores</h2>
          </header>
          <h3>Principal</h3>
          <div className="row align-items-center p-0 m-0">
            <h4 className="mr-5">Primario</h4>
            <div className={`${styles.dot} ${styles.colorPrimary}`}></div>
            <div
              className={`${styles.dot} ${styles.colorPrimaryLighten}`}
            ></div>
          </div>
          <div className="row align-items-center p-0 m-0">
            <h4 className="mr-5">Secundario</h4>
            <div className={`${styles.dot} ${styles.colorSecondary}`}></div>
            <div
              className={`${styles.dot} ${styles.colorSecondaryLighten}`}
            ></div>
          </div>
          <div className="row align-items-center p-0 m-0">
            <h4 className="mr-5">Terciario</h4>
            <div className={`${styles.dot} ${styles.colorTertiary}`}></div>
            <div
              className={`${styles.dot} ${styles.colorTertiaryLighten}`}
            ></div>
          </div>
          <h3>Escala de Grises</h3>
          <div className="row align-items-center p-0 m-0">
            <div className={`${styles.dot} ${styles.colorDark}`}></div>
            <div className={`${styles.dot} ${styles.colorGray4}`}></div>
            <div className={`${styles.dot} ${styles.colorGray3}`}></div>
            <div className={`${styles.dot} ${styles.colorGray2}`}></div>
            <div className={`${styles.dot} ${styles.colorGray1}`}></div>
          </div>
          <div className="row m-0 p-0">
            <div className="col">
              <h3>Degradados</h3>
              <div className={`${styles.dot} bg-gradient-secondary`}></div>
              <div className={`${styles.dot} bg-gradient-primary`}></div>
            </div>
            <div className="col">
              <h3>Usos específicos</h3>
              <div className={`${styles.dot} ${styles.colorWarning}`}></div>
              <div
                className={`${styles.dot} ${styles.colorWarningLighten}`}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Tipografía</h2>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Botones</h2>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </section>
    </PageContainer>
  );
}

export { HomePage };
