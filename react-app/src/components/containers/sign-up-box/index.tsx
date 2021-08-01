import { FacebookButton } from "react-app/src/components/layouts/facebook-button";
import { GoogleButton } from "react-app/src/components/layouts/google-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { AuthTermsAdvertise } from "react-app/src/components/layouts/auth-terms-advertise";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Link } from "../../common/routing/link";
import { SIGN_IN_PATH } from "react-app/src/routing/Paths";
import { SignUpWithEmailWizard } from "../sign-up-with-email-wizard";

const signInLink = (chunk: string) => <Link href={SIGN_IN_PATH}>{chunk}</Link>;

type SignUpBoxProps = {
  className?: string;
  willRedirect?: boolean;
};

const RegisterMessages = defineMessages({
  facebookMessage: { defaultMessage: "Registrarme con Facebook" },
  googleMessage: { defaultMessage: "Registrarme con Google" }
});

function SignUpBox({ className, willRedirect = false }: SignUpBoxProps) {
  const { formatMessage } = useIntl();

  return (
    <section className={classes(styles.SignUpBox, className)}>
      <div className={styles.SignUpBoxCard}>
        <FacebookButton
          className={styles.AuthProviderButton}
          textButton={formatMessage(RegisterMessages.facebookMessage)}
        />
        <GoogleButton
          className={styles.AuthProviderButton}
          textButton={formatMessage(RegisterMessages.googleMessage)}
        />
        <SignUpWithEmailWizard willRedirect={willRedirect} />
        <AuthTermsAdvertise className={styles.SignUpBoxAuthTermsAdvertise} />
      </div>
      <p className={styles.AlreadyRegisteredText}>
        <FormattedMessage
          defaultMessage="¿Ya tienes una cuenta? <signInLink>Iniciar sesión</signInLink>"
          values={{ signInLink }}
        />
      </p>
    </section>
  );
}

export { SignUpBox };
