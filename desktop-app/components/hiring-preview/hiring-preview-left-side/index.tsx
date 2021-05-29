import { HiringPreviewBanner } from "desktop-app/components/hiring-preview/hiring-preview-banner";
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
    <>
      <HiringPreviewBanner
        className={styles.HiringPreviewBanner}
        celebrityFullName={celebrityFullName}
        deliveryTo={deliveryTo}
      />
      <HiringPreviewCTACard className={styles.HiringPreviewCTACard} />
    </>
  );
}

export { HiringPreviewLeftSide };
