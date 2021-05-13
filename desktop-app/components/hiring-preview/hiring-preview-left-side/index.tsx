import classes from "classnames";
import { ROOT_PATH } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
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
      <div className={styles.CTACard}>
        <p className={styles.CTACardCopy}>
          ¡Ahora ya puedes conectar con tus famosos favoritos a través de
          Famosos.com!
        </p>
        <Link href={ROOT_PATH}>
          <button
            type="button"
            className={classes("btn btn-primary", styles.CTACardButton)}
          >
            Explorar Famosos
          </button>
        </Link>
      </div>
    </section>
  );
}

export { HiringPreviewLeftSide };
