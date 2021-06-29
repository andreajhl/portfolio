import React from "react";
import { authenticationOperations } from "../../../state/ducks/authentication";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";

// Props
type SignInEmailPasswordFormProps = {
  email: string;
  isLoading: boolean;
  isCompleted: boolean;
  failureData: any;
  signInWithEmail: (any: {}) => {};
};

// State
type SignInEmailPasswordFormState = {
  email: string;
  password: string;
  invalidEmail: boolean;
};

// Class component
class SignInEmailPasswordForm extends React.Component<SignInEmailPasswordFormProps, SignInEmailPasswordFormState> {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email || "",
      password: "",
      invalidEmail: false
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

  sendData() {
    this.setState({
      ...this.state,
      invalidEmail: false
    });
    if (this.props.isLoading) {
      return;
    }
    if (!isEmail(this.state.email) || this.state.email === "") {
      this.setState({
        ...this.state,
        invalidEmail: true
      });
      return;
    }
    this.props.signInWithEmail({
      email: this.state.email.trim().toLocaleLowerCase(),
      password: this.state.password
    });
    GTM.tagManagerDataLayer("CLICK_ON_SIGN_IN_WITH_EMAIL_PASSWORD", {
      email: this.state.email
    });
  }

  renderError() {
    if (this.props.failureData !== null && this.state.invalidEmail === false) {
      return (
        <small className={"text-danger"}>{this.props.failureData.error}</small>
      );
    } else if (this.state.invalidEmail === true) {
      return (
        <small className={"text-danger"}>Invalid email</small>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        <h3 className={styles.SignInBoxTitle}>
          <FormattedMessage defaultMessage="o ingresa con tu correo electrónico" />
        </h3>
        <AuthFormField
          label="Correo electrónico"
          placeholder="usuario@dominio.com"
          value={this.state.email}
          onChange={this.handleEmailInput}
          onKeyPress={this.handleKeyPress}
        />
        {/*TODO: Input group with show password button*/}
        <AuthFormField
          type="password"
          label="Contraseña"
          placeholder="**********"
          value={this.state.password}
          onChange={this.handlePasswordInput}
          onKeyPress={this.handleKeyPress}
        />
        <div className={"text-center"}>
          {this.renderError()}
        </div>
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
          disabled={this.props.isLoading}
          onClick={this.sendData}
        >
          <FormattedMessage defaultMessage={"Continuar"} />
        </button>
      </div>
    );
  }
}

// // mapStateToProps
// const mapStateToProps = (state) => ({
//   isLoading: state.authentication.signInWithEmailReducer.loading,
//   isCompleted: state.authentication.signInWithEmailReducer.completed,
//   successData: state.authentication.signInWithEmailReducer.data,
//   failureData: state.authentication.signInWithEmailReducer.error_data
// });
//
// // mapStateToProps
// const mapDispatchToProps = {
//   signInWithEmail: authenticationOperations.signInWithEmail
// };
//
// // Export Class
// const _SignInEmailPasswordForm = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignInEmailPasswordForm);
// export { _SignInEmailPasswordForm as SignInEmailPasswordForm };

export default SignInEmailPasswordForm;
