import React, {Component} from 'react';
import "./styles.scss";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {AuthTCLayout} from "../../layouts/auth-t&c";
import {SignInMethodsForm} from "../sign-in-methods-form";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";

class SignInWithEmailForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email,
            password: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.signInWithEmail = this.signInWithEmail.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToResetPassword = this.goToResetPassword.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.signInWithEmail();
        }
    };

    signInWithEmail(e) {
        if (!this.props.signInWithEmailLoading) {
            this.props.signInWithEmail({
                email: this.state.email.trim(),
                password: this.state.password,
            });
            GTM.tagManagerDataLayer(
                "CLICK_ON_SEND_SMS_SECURITY_CODE",
                {
                    email: this.state.email,
                }
            );
        }
    }

    goToSignUp() {
        history._pushRoute(PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form"))
    }

    goToResetPassword() {
        history._pushRoute(PATHS.RESET_PASSWORD_PATH)
    }

    render() {
        return (
            <div className="SignInWithEmailForm">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h6>Ingresa con tu correo electrónico</h6>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Escribe tu correo"
                        name="email"
                        onChange={this.handleInput}
                        value={this.state.email}
                    />
                    <h6>Contraseña</h6>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Escribe tu contraseña"
                        name="password"
                        onChange={this.handleInput}
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress}
                    />
                    {
                        this.props.signInWithEmailError
                        &&
                        <p className="instructions mt-4 text-danger">
                            {this.props.signInWithEmailError}
                        </p>
                    }
                    <button className="send-button"
                            disabled={!this.state.email || !this.state.password}
                            onClick={this.signInWithEmail}
                    >
                        {
                            this.props.signInWithEmailLoading
                                ?
                                <span className="text-white spinner-grow spinner-grow-sm"
                                      role="status"
                                      aria-hidden="true"
                                />
                                :
                                <span className={"text-white"}>Continuar</span>

                        }
                    </button>
                </form>
                <div className="mb-2">
                    <div className="mt-2 cursor-pointer">
                        <small className="font-weight-normal" onClick={this.goToSignUp}>
                            Crear una cuenta
                        </small>
                    </div>
                    <div className="mt-2 cursor-pointer">
                        <small className="font-weight-normal" onClick={this.goToResetPassword}>
                            Olvidé mi contraseña
                        </small>
                    </div>
                </div>
                <SignInMethodsForm cellphone={true} whatsapp={true}/>
                <AuthTCLayout/>
            </div>
        );
    };

}

// Set propTypes
SignInWithEmailForm.propTypes = {};

// Set defaultProps
SignInWithEmailForm.defaultProps = {
    email: ""
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    signInWithEmailLoading: state.authentication.signInWithEmailReducer.loading,
    signInWithEmailCompleted: state.authentication.signInWithEmailReducer.completed,
    signInWithEmailError: state.authentication.signInWithEmailReducer.error_data.error,
    signInWithEmailData: state.authentication.signInWithEmailReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    signInWithEmail: authenticationOperations.signInWithEmail,
};

// Export Class
const _SignInWithEmailForm = connect(mapStateToProps, mapDispatchToProps)(SignInWithEmailForm);
export {_SignInWithEmailForm as SignInWithEmailForm};
