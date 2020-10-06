import React, { Component } from "react";
import "./styles.scss";
import { authenticationOperations } from "../../../state/ducks/authentication";
import { connect } from "react-redux";
import { AuthTCLayout } from "../../layouts/auth-t&c";
import { getUTMs } from "../../../state/utils/UTMs";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";

class SignUpWithEmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email || "",
      securityCode: "",
      showForm: 1,
      emailIsInvalid: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.validateIfEmailIsRegistered = this.validateIfEmailIsRegistered.bind(
      this
    );
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.validateIfEmailIsRegistered();
    }
  };

  validateIfEmailIsRegistered() {
    this.setState((state) => ({ ...state, emailIsInvalid: false }));
    if (!this.props.validateIfEmailIsRegisteredLoading) {
      this.props.validateIfEmailIsRegistered({
        ...getUTMs(),
        email: this.state.email
      });
      GTM.tagManagerDataLayer("CLICK_ON_SEND_SMS_SECURITY_CODE", {
        ...getUTMs(),
        email: this.state.email
      });
    }
  }

  signUpWithEmail() {
    if (isEmail(this.state.email)) {
      this.validateIfEmailIsRegistered();
    } else {
      this.setState((state) => ({ ...state, emailIsInvalid: true }));
    }
  }

  goToSignIn() {
    history._pushRoute(
      PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
    );
  }

  render() {
    return (
      <div className="SignUpWithEmailForm">
        <form onSubmit={(e) => e.preventDefault()}>
          <h6>Ingresa con tu correo electrónico</h6>
          <div className="form-horizontal">
            <input
              type="email"
              className={`form-control ${
                this.props.validateIfEmailIsRegisteredError ||
                this.state.emailIsInvalid
                  ? "border-danger"
                  : ""
              }`}
              placeholder="Escribe tu correo"
              name="email"
              onChange={this.handleInput}
              value={this.state.email}
            />
          </div>
        </form>
        {this.props.validateIfEmailIsRegisteredError ||
        this.state.emailIsInvalid ? (
          <p className="instructions mt-4 text-danger">
            {this.props.validateIfEmailIsRegisteredError ||
              "Introduce un correo electrónico valido"}
          </p>
        ) : null}
        <button
          className="send-button"
          disabled={!this.state.email}
          onClick={this.signUpWithEmail}
        >
          {this.props.validatingIfEmailIsRegistered ? (
            <span
              className="text-white spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span className="text-white">Continuar</span>
          )}
        </button>
        <div className="mb-4 pb-4">
          <div className="mt-2 float-left cursor-pointer">
            <small className="text-muted" onClick={this.goToSignIn}>
              Ya tengo una cuenta
            </small>
          </div>
        </div>
        {/*<SignInMethodsForm cellphone={true} whatsapp={true} signUp={true}/>*/}
        <AuthTCLayout />
      </div>
    );
  }
}

// Set propTypes
SignUpWithEmailForm.propTypes = {};

// Set defaultProps
SignUpWithEmailForm.defaultProps = {
  email: ""
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
  // validateIfEmailIsRegisteredReducer
  validateIfEmailIsRegisteredLoading:
    state.authentication.validateIfEmailIsRegisteredReducer.loading,
  validateIfEmailIsRegisteredError:
    state.authentication.validateEmailSecurityCodeReducer.error_data.error,
  validateIfEmailIsRegisteredCompleted:
    state.authentication.validateEmailSecurityCodeReducer.completed,
  validateIfEmailIsRegisteredData:
    state.authentication.validateEmailSecurityCodeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  validateIfEmailIsRegistered:
    authenticationOperations.validateIfEmailIsRegistered
};

// Export Class
const _SignUpWithEmailForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpWithEmailForm);
export { _SignUpWithEmailForm as SignUpWithEmailForm };
