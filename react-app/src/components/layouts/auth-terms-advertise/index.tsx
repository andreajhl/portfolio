import classes from "classnames";
import { Link } from "react-app/src/components/common/routing/link";
import { POLICIES_PATH, TERMS_PATH } from "react-app/src/routing/Paths";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type AuthTermsProps = {
  className?: string;
};

const termsLink = (chunks: string) => (
  <Link href={TERMS_PATH} className={styles.AuthTermsLink}>
    {chunks}
  </Link>
);

const policiesLink = (chunks: string) => (
  <Link href={POLICIES_PATH} className={styles.AuthTermsLink}>
    {chunks}
  </Link>
);

function AuthTermsAdvertise({ className }: AuthTermsProps) {
  return (
    <p className={classes(styles.AuthTerms, className)}>
      <FormattedMessage
        defaultMessage="Al continuar acepto de manera expresa e informada los
          <termsLink>Términos y Condiciones</termsLink> 
          y la 
          <policiesLink>Política de Privacidad</policiesLink> 
          de Famosos Inc."
        values={{ termsLink, policiesLink }}
      />
    </p>
  );
}

export { AuthTermsAdvertise };
