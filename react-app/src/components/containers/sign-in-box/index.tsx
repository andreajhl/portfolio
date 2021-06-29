import { FacebookButton } from "react-app/src/components/layouts/facebook-button";
import { GoogleButton } from "react-app/src/components/layouts/google-button";
import { connect, ConnectedProps } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import { AuthTermsAdvertise } from "react-app/src/components/layouts/auth-terms-advertise";
import { FormattedMessage } from "react-intl";
import { Link } from "../../common/routing/link";
import { SIGN_UP_PATH } from "react-app/src/routing/Paths";
import { SignInEmailPasswordForm } from "../sign-in-with-email-form";

const signUpLink = (chunk: string) => <Link href={SIGN_UP_PATH}>{chunk}</Link>;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SignInBoxProps = {
  className?: string;
} & PropsFromRedux;

function SignInBox({ className }: SignInBoxProps) {
  return (
    <section className={classes(styles.SignInBox, className)}>
      <div className={styles.SignInBoxCard}>
        <FacebookButton className={styles.AuthProviderButton}>
          <FormattedMessage defaultMessage="Ingresar con Facebook" />
        </FacebookButton>
        <GoogleButton className={styles.AuthProviderButton}>
          <FormattedMessage defaultMessage="Ingresar con Google" />
        </GoogleButton>
        <SignInEmailPasswordForm email={""} />
        <AuthTermsAdvertise className={styles.SignInBoxAuthTermsAdvertise} />
        <Link href="#" className={styles.ForgotPasswordLink}>
          <FormattedMessage defaultMessage="Olvidé mi contraseña" />
        </Link>
      </div>
      <p className={styles.NotRegisteredText}>
        <FormattedMessage
          defaultMessage="¿No tienes una cuenta? <signUpLink>Registrarme</signUpLink>"
          values={{ signUpLink }}
        />
      </p>
    </section>
  );
}

const _SignInBox = connector(SignInBox);

export { _SignInBox as SignInBox };
