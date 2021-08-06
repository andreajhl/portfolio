import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type NoResultsBannerProps = {
  className?: string;
};

function NoResultsBanner({ className = "" }: NoResultsBannerProps) {
  return (
    <div className={`${styles.NoResultsBanner} ${className}`}>
      <img
        className={styles.NoResultsBannerIllustration}
        src="/assets/img/empty-illustration.svg"
        alt="Caja vacía"
      />
      <div>
        <h3 className={styles.NoResultsBannerTitle}>
          <FormattedMessage defaultMessage="No se encontraron resultados" />
        </h3>
        <p className={styles.NoResultsBannerCopy}>
          <FormattedMessage defaultMessage="Intenta quitando o cambiando algunos filtros." />
        </p>
      </div>
    </div>
  );
}

export { NoResultsBanner };
