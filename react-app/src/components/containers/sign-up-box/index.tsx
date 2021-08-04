import { FacebookButton } from "react-app/src/components/layouts/facebook-button";
import { GoogleButton } from "react-app/src/components/layouts/google-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { AuthTermsAdvertise } from "react-app/src/components/layouts/auth-terms-advertise";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Link } from "../../common/routing/link";
import { SignUpEmailPasswordForm } from "../sign-up-with-email-form";
import { useRouter } from "next/router";
import { SIGN_IN_FROM_PATH, SIGN_IN_PATH } from "constants/paths";
import { SUGGESTED_FULL_NAME_QUERY_PARAM } from "constants/keys";

type SignUpBoxProps = {
  className?: string;
  willRedirect?: boolean;
};

const RegisterMessages = defineMessages({
  facebookMessage: { defaultMessage: "Registrarme con Facebook" },
  googleMessage: { defaultMessage: "Registrarme con Google" },
});

function SignUpBox({ className, willRedirect = false }: SignUpBoxProps) {
  const { formatMessage } = useIntl();
  const { query } = useRouter();

  const signInPath = willRedirect ? SIGN_IN_FROM_PATH : SIGN_IN_PATH;
  const signInHref = {
    pathname: signInPath,
    query,
  };
  const signInLink = (chunk: string) => <Link href={signInHref}>{chunk}</Link>;

  const suggestedFullName = (query?.[SUGGESTED_FULL_NAME_QUERY_PARAM] ||
    "") as string;

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
        <SignUpEmailPasswordForm
          willRedirect={willRedirect}
          initialValues={{ fullName: suggestedFullName }}
        />
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
