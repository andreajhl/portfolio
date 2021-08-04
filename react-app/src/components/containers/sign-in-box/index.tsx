import { FacebookButton } from "react-app/src/components/layouts/facebook-button";
import { GoogleButton } from "react-app/src/components/layouts/google-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { AuthTermsAdvertise } from "react-app/src/components/layouts/auth-terms-advertise";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Link } from "../../common/routing/link";
import { SignInEmailPasswordForm } from "../sign-in-with-email-form";
import dynamic from "next/dynamic";
import { AuthenticationFailurePopupProps } from "../authentication-failure-popup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  RESET_PASSWORD_PATH,
  SIGN_UP_FROM_PATH,
  SIGN_UP_PATH,
} from "constants/paths";
import Maybe from "desktop-app/components/common/helpers/maybe";

const AuthenticationFailurePopup = dynamic<AuthenticationFailurePopupProps>(
  () =>
    import("../authentication-failure-popup").then(
      (mod) => mod.AuthenticationFailurePopup
    )
);
const LoginMessages = defineMessages({
  facebookMessage: { defaultMessage: "Ingresar con Facebook" },
  googleMessage: { defaultMessage: "Ingresar con Google" },
});

type SignInBoxProps = {
  className?: string;
  willRedirect?: boolean;
};

function SignInBox({ className, willRedirect = false }: SignInBoxProps) {
  const { query } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (query.error) {
      setErrorMessage(String(query.error));
    }
  }, [query]);
  const { formatMessage } = useIntl();

  const signUpPath = willRedirect ? SIGN_UP_FROM_PATH : SIGN_UP_PATH;
  const signUpHref = {
    pathname: signUpPath,
    query,
  };
  const signUpLink = (chunk: string) => <Link href={signUpHref}>{chunk}</Link>;

  return (
    <section className={classes(styles.SignInBox, className)}>
      <div className={styles.SignInBoxCard}>
        <FacebookButton
          className={styles.AuthProviderButton}
          textButton={formatMessage(LoginMessages.facebookMessage)}
        />
        <GoogleButton
          className={styles.AuthProviderButton}
          textButton={formatMessage(LoginMessages.googleMessage)}
        />
        <SignInEmailPasswordForm email={""} />
        <AuthTermsAdvertise className={styles.SignInBoxAuthTermsAdvertise} />
        <Link href={RESET_PASSWORD_PATH} className={styles.ForgotPasswordLink}>
          <FormattedMessage defaultMessage="Olvidé mi contraseña" />
        </Link>
      </div>
      <Maybe it={errorMessage.length > 0}>
        <AuthenticationFailurePopup errorMessage={errorMessage} />
      </Maybe>
      <p className={styles.NotRegisteredText}>
        <FormattedMessage
          defaultMessage="¿No tienes una cuenta? <signUpLink>Registrarme</signUpLink>"
          values={{ signUpLink }}
        />
      </p>
    </section>
  );
}

export { SignInBox };
