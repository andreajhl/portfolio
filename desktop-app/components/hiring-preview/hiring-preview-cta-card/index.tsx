import { ROOT_PATH } from "constants/paths";
import classes from "classnames";
import styles from "./styles.module.scss";
import { Link } from "../../common/routing/link";
import { FormattedMessage } from "react-intl";

type HiringPreviewCTACardProps = {
  className?: string;
};

function HiringPreviewCTACard({ className }: HiringPreviewCTACardProps) {
  return (
    <div className={classes(styles.CTACard, className)}>
      <p className={styles.CTACardCopy}>
        <FormattedMessage defaultMessage="Ahora ya puedes conectar con tus famosos favoritos a través de Famosos.com!" />
      </p>
      <Link href={ROOT_PATH}>
        <button
          type="button"
          className={classes("btn btn-primary", styles.CTACardButton)}
        >
          <FormattedMessage defaultMessage="Explorar Famosos" />
        </button>
      </Link>
    </div>
  );
}

export { HiringPreviewCTACard };
