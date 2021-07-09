import React from "react";
import * as GTM from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import axios from "axios";
import { Session } from "../../../state/utils/session";
import FormCheck from "react-bootstrap/FormCheck";
import Maybe from "../../common/helpers/maybe";

// Props
type SignUpEmailPasswordFormProps = {
  willRedirect: boolean;
  intl: any;
};

// State
type SignUpEmailPasswordFormState = {
  fullName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  birthDate: string;
  allowNotifications: boolean;
  isLoading: boolean;
  isCompleted: boolean;
  error: string;
  showPassword: boolean;
};

// Class component
class SignUpEmailPasswordForm extends React.Component<
  SignUpEmailPasswordFormProps,
  SignUpEmailPasswordFormState
> {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmationPassword: "",
      birthDate: "",
      allowNotifications: true,
      isLoading: false,
      isCompleted: false,
      error: null,
      showPassword: false
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleFullNameInput = this.handleFullNameInput.bind(this);
    this.handleBirthDateInput = this.handleBirthDateInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmationPasswordInput = this.handleConfirmationPasswordInput.bind(
      this
    );
    this.handleAllowNotificationsInput = this.handleAllowNotificationsInput.bind(
      this
    );
    this.sendData = this.sendData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleShowPasswordState = this.toggleShowPasswordState.bind(this);
  }

  handleFullNameInput(event) {
    this.setState({
      ...this.state,
      fullName: event.target.value
    });
  }

  handleBirthDateInput(event) {
    this.setState({
      ...this.state,
      birthDate: event.target.value
    });
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

  handleConfirmationPasswordInput(event) {
    this.setState({
      ...this.state,
      confirmationPassword: event.target.value
    });
  }

  handleAllowNotificationsInput(event) {
    this.setState({
      ...this.state,
      allowNotifications: !this.state.allowNotifications
    });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendData().then((r) => {
        console.log(r);
      });
    }
  };

  validateInputs = () => {
    // Validate full name
    if (this.state.fullName === "") {
      return "Name field is required";
    }
    // Validate birthDate
    if (this.state.birthDate === "") {
      return "Birthdate field is required";
    }
    // Validate email
    if (!isEmail(this.state.email) || this.state.email === "") {
      return "Invalid email";
    }
    // Validate passwords
    if (this.state.password.length < 6) {
      return "Password length must contains least 6 characters";
    }
    if (this.state.password !== this.state.confirmationPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  sendData = async () => {
    // Remove error message
    this.setState({
      ...this.state,
      error: null
    });
    // Prevent send several requests
    if (this.state.isLoading) {
      return;
    }
    // Notify event
    GTM.tagManagerDataLayer("CLICK_ON_SIGN_UP_WITH_EMAIL_PASSWORD", {
      email: this.state.email
    });
    // Validate inputs
    const err = this.validateInputs();
    if (err !== null) {
      this.setState({
        ...this.state,
        error: err
      });
      return;
    }
    // Send request
    await axios
      .post("/api/email-password-sign-up", {
        fullName: this.state.fullName,
        email: this.state.email.trim().toLocaleLowerCase(),
        password: this.state.password,
        birthDate: this.state.birthDate,
        allowNotifications: this.state.allowNotifications,
        locale: this.props.intl ? this.props.intl.locale.toUpperCase() : "ES"
      })
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
      });
  };

  toggleShowPasswordState() {
    this.setState((oldState) => ({
      ...oldState,
      showPassword: !oldState.showPassword
    }));
  }

  renderError() {
    if (this.state.error !== null && this.state.error !== "") {
      return <small className={"text-danger"}>Error {this.state.error}</small>;
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
        <AuthFormField
          label={<FormattedMessage defaultMessage="Nombre" />}
          placeholder="Marcos"
          value={this.state.fullName}
          onChange={this.handleFullNameInput}
        />
        <AuthFormField
          type="date"
          label={<FormattedMessage defaultMessage="Cumpleaños" />}
          placeholder="DD / MM / AA"
          value={this.state.birthDate}
          onChange={this.handleBirthDateInput}
        />
        <AuthFormField
          label={<FormattedMessage defaultMessage="Correo electrónico" />}
          placeholder="usuario@dominio.com"
          value={this.state.email}
          onChange={this.handleEmailInput}
        />
        {/*TODO: Input group with show password button*/}
        <AuthFormField
          type={this.state.showPassword ? "text" : "password"}
          label={<FormattedMessage defaultMessage="Contraseña" />}
          placeholder="**********"
          value={this.state.password}
          onChange={this.handlePasswordInput}
          onIconClick={this.toggleShowPasswordState}
          iconElement={
            !this.state.showPassword ? (
              <i className="fas fa-eye cursor-pointer"></i>
            ) : (
              <i className="fas fa-eye-slash cursor-pointer"></i>
            )
          }
        />
        {/*TODO: Input group with show password button*/}
        <AuthFormField
          type={this.state.showPassword ? "text" : "password"}
          label={<FormattedMessage defaultMessage="Confirmar" />}
          placeholder="**********"
          value={this.state.confirmationPassword}
          onChange={this.handleConfirmationPasswordInput}
        />
        <FormCheck
          id="accept-offers-and-benefits"
          className={styles.SignUpBoxSwitcher}
          type="switch"
          label={
            <FormattedMessage defaultMessage="Quiero recibir ofertas y beneficios exclusivos." />
          }
          checked={this.state.allowNotifications}
          onChange={this.handleAllowNotificationsInput}
        />
        <div className={"text-center mt-2"}>{this.renderError()}</div>
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignUpBoxSubmitButton)}
          disabled={this.state.isLoading}
          onClick={this.sendData}
        >
          <Maybe
            it={this.props.willRedirect}
            orElse={<FormattedMessage defaultMessage="Registrarme" />}
          >
            <FormattedMessage defaultMessage="Registrarme y continuar" />
          </Maybe>
        </button>
        <hr />
      </div>
    );
  }
}

// Export Class
const _SignUpEmailPasswordForm = injectIntl(SignUpEmailPasswordForm);
export { _SignUpEmailPasswordForm as SignUpEmailPasswordForm };
