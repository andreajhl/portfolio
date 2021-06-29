import React from "react";
import * as GTM from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import axios from "axios";
import { Session } from "../../../state/utils/session";
import FormCheck from "react-bootstrap/FormCheck";
import Maybe from "../../common/helpers/maybe";

// Props
type SignUpEmailPasswordFormProps = {
  willRedirect: boolean;
};

// State
type SignUpEmailPasswordFormState = {
  email: string;
  password: string;
  isLoading: boolean;
  isCompleted: boolean;
  error: string;
};

// Class component
class SignUpEmailPasswordForm extends React.Component<SignUpEmailPasswordFormProps, SignUpEmailPasswordFormState> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      isCompleted: false,
      error: null
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleEmailInput(event) {
    this.setState({
      ...this.state,
      email: event.target.value.trim().toLocaleLowerCase()
    });
  }

  handlePasswordInput(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendData();
    }
  };

  sendData = async () => {
    // Prevent send several requests
    if (this.state.isLoading) {
      return;
    }
    // Notifiy event
    GTM.tagManagerDataLayer("CLICK_ON_SIGN_IN_WITH_EMAIL_PASSWORD", {
      email: this.state.email
    });
    // Remove error message
    this.setState({
      ...this.state,
      error: null
    });
    // Validate emails
    if (!isEmail(this.state.email) || this.state.email === "") {
      this.setState({
        ...this.state,
        error: "Invalid email"
      });
      return;
    }
    // Remove error message
    this.setState({
      ...this.state,
      error: null
    });
    // Send request
    await axios.post(
      "/api/email-password-sign-in",
      {
        email: this.state.email.trim().toLocaleLowerCase(),
        password: this.state.password
      }
    )
      .then((response) => {
          if (response.data.status === "OK") {
            const session = new Session();
            session.initSession();
          } else {
            this.setState({
              ...this.state,
              error: response.data.error
            });
          }
        }
      );
  };

  renderError() {
    if (this.state.error !== null && this.state.error !== "") {
      return (
        <small className={"text-danger"}>{this.state.error}</small>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div>
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
            it={this.props.willRedirect}
            orElse={<FormattedMessage defaultMessage="Registrarme" />}
          >
            <FormattedMessage defaultMessage="Registrarme y continuar" />
          </Maybe>
        </button>
      </div>
    );
  }
}

export { SignUpEmailPasswordForm } ;
