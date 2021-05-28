import { HiringPreviewCTACard } from "desktop-app/components/hiring-preview/hiring-preview-cta-card";
import styles from "./styles.module.scss";

type HiringPreviewLeftSideProps = {
  celebrityFullName: string;
  deliveryTo: string;
};

function HiringPreviewLeftSide({
  celebrityFullName,
  deliveryTo,
}: HiringPreviewLeftSideProps) {
  return (
    <section className={styles.HiringPreviewLeftSide}>
      <img
        className={styles.FamososLogo}
        src="/assets/img/famosos-icon.png"
        alt="Icono de Famosos Inc."
      />
      <h1 className={styles.Title}>
        Mira este video de {celebrityFullName} para {deliveryTo}.
      </h1>
      <HiringPreviewCTACard />
    </section>
  );
}

export { HiringPreviewLeftSide };
