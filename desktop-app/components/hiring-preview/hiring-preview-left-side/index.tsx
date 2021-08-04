import Maybe from "desktop-app/components/common/helpers/maybe";
import { HiringPreviewOwnerBanner } from "desktop-app/components/hiring-preview/hiring-preview-owner-banner";
import { HiringPreviewBanner } from "desktop-app/components/hiring-preview/hiring-preview-banner";
import { HiringPreviewCTACard } from "desktop-app/components/hiring-preview/hiring-preview-cta-card";
import styles from "./styles.module.scss";
import classes from "classnames";

type HiringPreviewLeftSideProps = {
  celebrityFullName: string;
  deliveryTo: string;
  isUnauthorized?: boolean;
  contractReference: string;
};

function HiringPreviewLeftSide({
  celebrityFullName,
  deliveryTo,
  isUnauthorized = false,
  contractReference,
}: HiringPreviewLeftSideProps) {
  return (
    <>
      <HiringPreviewBanner
        className={styles.HiringPreviewBanner}
        celebrityFullName={celebrityFullName}
        deliveryTo={deliveryTo}
      />
      <HiringPreviewCTACard
        className={classes(
          styles.HiringPreviewCTACard,
          isUnauthorized && styles.HiringPreviewCTACardUnauthorized
        )}
      />
      <Maybe it={isUnauthorized}>
        <HiringPreviewOwnerBanner
          className={styles.OwnerBanner}
          contractReference={contractReference}
        />
      </Maybe>
    </>
  );
}

export { HiringPreviewLeftSide };
