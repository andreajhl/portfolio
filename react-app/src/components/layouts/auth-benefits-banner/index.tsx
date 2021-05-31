import classes from "classnames";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type AuthBenefitsBannerProps = {
  className?: string;
};

function AuthBenefitsBanner({ className = "" }: AuthBenefitsBannerProps) {
  return (
    <ul className={classes(styles.AuthBenefitsBanner, className)}>
      <li className={styles.AuthBenefitsBannerItem}>
        <img
          src="/assets/img/sparkles.svg"
          alt="Chispas"
          className={styles.AuthBenefitsBannerSparkles}
        />
        <p>
          <FormattedMessage defaultMessage="Vive experiencias únicas con cientos de famosos latinos." />
        </p>
      </li>
      <li className={styles.AuthBenefitsBannerItem}>
        <img
          src="/assets/img/megaphone.svg"
          alt="Chispas"
          className={styles.AuthBenefitsBannerMegaphone}
        />
        <p className={styles.AuthBenefitsBannerPromoText}>
          <FormattedMessage
            defaultMessage="Recibe promociones y noticias sobre famosos que se sumen a nuestra
          comunidad."
          />
        </p>
      </li>
    </ul>
  );
}

export { AuthBenefitsBanner };
