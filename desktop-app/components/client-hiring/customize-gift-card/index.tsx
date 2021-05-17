import classes from "classnames";
import { getClientHiringPreviewEditorPath } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";

type CustomizeGiftCardProps = {
  className?: string;
  deliveryTo: string;
  contractReference: string;
};

function CustomizeGiftCard({
  className = "",
  deliveryTo,
  contractReference,
}: CustomizeGiftCardProps) {
  return (
    <section className={classes(styles.CustomizeGiftCard, className)}>
      <div className={styles.ContentContainer}>
        <h2 className={styles.Title}>
          ¡Personaliza la entrega del video para {deliveryTo}!
        </h2>
        <p className={styles.CustomizeGiftText}>
          Personaliza el fondo y agrega un mensaje para hacer más especial la
          entrega de tu video.
        </p>
      </div>
      <div className={styles.ButtonWrapper}>
        <Link href={getClientHiringPreviewEditorPath(contractReference)}>
          <button
            type="button"
            className={classes("btn btn-primary", styles.CTAButton)}
          >
            Personalizar entrega
          </button>
        </Link>
      </div>
    </section>
  );
}

export { CustomizeGiftCard };
