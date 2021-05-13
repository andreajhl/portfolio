import classes from "classnames";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";

type CustomizeGiftCardProps = {
  className?: string;
  deliveryTo: string;
};

function CustomizeGiftCard({
  className = "",
  deliveryTo,
}: CustomizeGiftCardProps) {
  return (
    <section className={classes(styles.CustomizeGiftCard, className)}>
      <h2 className={styles.Title}>
        ¡Personaliza la entrega del video para {deliveryTo}!
      </h2>
      <p className={styles.CustomizeGiftText}>
        Personaliza el fondo y agrega un mensaje para hacer más especial la
        entrega de tu video.
      </p>
      <Link href="/#">
        <button
          type="button"
          className={classes("btn btn-primary", styles.CTAButton)}
        >
          Personalizar entrega
        </button>
      </Link>
    </section>
  );
}

export { CustomizeGiftCard };
