import React from "react";
import * as GTM from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import axios from "axios";
import { Session } from "../../../state/utils/session";
import {
  LOGIN_ERROR_MESSAGES_WITH_TRANSLATIONS_AVAILABLE,
  TRANSLATION_LOGIN_ERROR_MESSAGES
} from "react-app/src/constants/messages";
import { SubmitText } from "../../common/widgets/submit-button-text";

// Props
type SignInEmailPasswordFormProps = {
  email: string;
} & WrappedComponentProps;

// State
type SignInEmailPasswordFormState = {
  email: string;
  password: string;
  isLoading: boolean;
  isCompleted: boolean;
  error: string;
  showPassword: boolean;
};

// Class component
class SignInEmailPasswordForm extends React.Component<
  SignInEmailPasswordFormProps,
  SignInEmailPasswordFormState
> {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email || "",
      password: "",
      isLoading: false,
      isCompleted: false,
      error: null,
      showPassword: false
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.sendData = this.sendData.bind(this);
    this.toggleShowPasswordState = this.toggleShowPasswordState.bind(this);
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

  validateInputs = () => {
    // Validate emails
    if (!isEmail(this.state.email) || this.state.email === "") {
      return "Invalid email";
    }
    // Validate passwords
    if (this.state.password === "") {
      return "Password field is required";
    }
    return null;
  };

  sendData = async (event) => {
    event?.preventDefault?.();
    // Remove error message
    this.setState({
      ...this.state,
      error: null
    });
    // Prevent send several requests
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });

    // Notifiy event
    GTM.tagManagerDataLayer("CLICK_ON_SIGN_IN_WITH_EMAIL_PASSWORD", {
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
      .post("/api/email-password-sign-in", {
        email: this.state.email.trim().toLocaleLowerCase(),
        password: this.state.password
      })
      .then((response) => {
        if (response.data.status === "OK") {
          const session = new Session();
          session.initSession();
        } else {
          this.setState({
            ...this.state,
            isLoading: false,
            error: response.data.error
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  renderError() {
    if (this.state.error !== null && this.state.error !== "") {
      return (
        <small className={"text-danger"}>
          Error{" "}
          {LOGIN_ERROR_MESSAGES_WITH_TRANSLATIONS_AVAILABLE.includes(
            this.state.error
          )
            ? this.props.intl.formatMessage(
                TRANSLATION_LOGIN_ERROR_MESSAGES[this.state.error]
              )
            : this.state.error}{" "}
        </small>
      );
    } else {
      return null;
    }
  }

  toggleShowPasswordState() {
    this.setState((oldState) => ({
      ...oldState,
      showPassword: !oldState.showPassword
    }));
  }

  render() {
    return (
      <form onSubmit={this.sendData} noValidate>
        <h3 className={styles.SignInBoxTitle}>
          <FormattedMessage defaultMessage="o ingresa con tu correo electrónico" />
        </h3>
        <AuthFormField
          type="email"
          name="email"
          label={<FormattedMessage defaultMessage="Correo electrónico" />}
          placeholder="usuario@dominio.com"
          value={this.state.email}
          onChange={this.handleEmailInput}
        />
        <AuthFormField
          autoComplete="current-password"
          name="current-password"
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
        <div className={"text-center"}>{this.renderError()}</div>
        <button
          type="submit"
          className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
          disabled={this.state.isLoading}
        >
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Ingresar" />}
            status={this.state.isLoading ? "loading" : "idle"}
          />
        </button>
      </form>
    );
  }
}

const _SignInEmailPasswordForm = injectIntl(SignInEmailPasswordForm);
export { _SignInEmailPasswordForm as SignInEmailPasswordForm };
