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
        <h3 className={styles.SignUpBoxTitle}>
          <FormattedMessage defaultMessage="o regístrate con tu correo electrónico" />
        </h3>
        <AuthFormField label="Nombre" placeholder="Marcos" />
        <AuthFormField
          type="date"
          label="Cumpleaños"
          placeholder="DD / MM / AA"
        />
        <AuthFormField
          label="Correo electrónico"
          placeholder="usuario@dominio.com"
        />
        <AuthFormField
          type="password"
          label="Contraseña"
          placeholder="**********"
        />
        <AuthFormField
          type="password"
          label="Confirmar contraseña"
          placeholder="**********"
        />
        <FormCheck
          id="accept-offers-and-benefits"
          className={styles.SignUpBoxSwitcher}
          type="switch"
          label="Quiero recibir ofertas y beneficios exclusivos."
        />
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignUpBoxSubmitButton)}
        >
          <Maybe
            it={willRedirect}
            orElse={<FormattedMessage defaultMessage="Registrarme" />}
          >
            <FormattedMessage defaultMessage="Registrarme y continuar" />
          </Maybe>
        </button>
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
