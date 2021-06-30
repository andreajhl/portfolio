import { AuthFormField } from "react-app/src/components/layouts/auth-form-field";
import { FacebookButton } from "react-app/src/components/layouts/facebook-button";
import { GoogleButton } from "react-app/src/components/layouts/google-button";
import { connect, ConnectedProps } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import FormCheck from "react-bootstrap/FormCheck";
import { AuthTermsAdvertise } from "react-app/src/components/layouts/auth-terms-advertise";
import { FormattedMessage } from "react-intl";
import { Link } from "../../common/routing/link";
import { SIGN_IN_PATH } from "react-app/src/routing/Paths";
import Maybe from "../../common/helpers/maybe";
import { SignUpEmailPasswordForm } from "../sign-up-with-email-form";

const signInLink = (chunk: string) => <Link href={SIGN_IN_PATH}>{chunk}</Link>;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SignUpBoxProps = {
  className?: string;
  willRedirect?: boolean;
} & PropsFromRedux;

function SignUpBox({ className, willRedirect = false }: SignUpBoxProps) {
  return (
    <section className={classes(styles.SignUpBox, className)}>
      <div className={styles.SignUpBoxCard}>
        <FacebookButton className={styles.AuthProviderButton}>
          <FormattedMessage defaultMessage="Registrarme con Facebook" />
        </FacebookButton>
        <GoogleButton className={styles.AuthProviderButton}>
          <FormattedMessage defaultMessage="Registrarme con Google" />
        </GoogleButton>
        <SignUpEmailPasswordForm willRedirect={willRedirect}/>
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

const _SignUpBox = connector(SignUpBox);

export { _SignUpBox as SignUpBox };
