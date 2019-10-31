import React, {Component} from 'react';
import "./styles.scss";
import * as PropTypes from "prop-types";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class SignInWithEmailForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            securityCode: "",
            showForm1: true
        };

        this.onChangeSignInType = this.onChangeSignInType.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.signInWithEmail = this.signInWithEmail.bind(this);
        this.goToResetPassword = this.goToResetPassword.bind(this);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.securityCodeSent === true && this.props.securityCodeSent !== nextProps.securityCodeSent) {
            this.setState({showForm1: false})
        }
    }

    showForm1() {
        this.setState({showForm1: !this.state.showForm1})
    }

    onChangeSignInType() {
        this.props.onChangeSignInType("cellphone");
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    goToResetPassword() {
        history.push(PATHS.RESET_PASSWORD_PATH)
    }

    goToSignUp() {
        history.push(PATHS.SIGN_UP_PATH)
    }

    signInWithEmail(e) {
        if (!this.props.isLoading) {
            const data = {
                email: this.state.email,
                password: this.state.password,
            };
            this.props.signInWithEmail(data);
        }
    }

    render() {
        return (
            <div className="SignInWithEmailForm">
                <>
                    <h6>Ingresa con tú correo electrónico</h6>
                    <input
                        autoFocus={true}
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
                    />
                    {
                        this.props.signInError
                            ?
                            <p className="instructions mt-4 text-danger">
                                {this.props.signInError}
                            </p>
                            : null
                    }
                    <button className="send-button"
                            disabled={!this.state.email || !this.state.password}
                            onClick={this.signInWithEmail}
                    >
                        {
                            this.props.isLoading
                                ?
                                <span className="spinner-grow spinner-grow-sm"
                                      role="status"
                                      aria-hidden="true"
                                />
                                :
                                <span>Enviar</span>

                        }
                    </button>
                    <div className="mb-4 pb-4">
                        <div className="mt-2 float-left cursor-pointer">
                            <small className="text-muted" onClick={this.goToSignUp}>Crear una cuenta</small>
                        </div>
                        <div className="mt-2 float-right cursor-pointer">
                            <small className="text-muted" onClick={this.goToResetPassword}>Olvidé mi contraseña</small>
                        </div>
                    </div>
                    <div className="login-type-button" onClick={this.onChangeSignInType}>
                        Ingresar con número de celular
                    </div>
                    <div className="terms custom-control custom-checkbox">
                        <input type="checkbox"
                               className="custom-control-input"
                               checked
                        />
                        <label className="custom-control-label" htmlFor="defaultUnchecked">
                            Acepto de manera expresa e informada los Términos &amp; Condiciones y la
                            Política de Privacidad de Famosos Inc.
                        </label>
                    </div>
                </>
            </div>
        );
    };

}

// Set propTypes
SignInWithEmailForm.propTypes = {
    onChangeSignInType: PropTypes.func.isRequired,
};

// Set defaultProps
SignInWithEmailForm.defaultProps = {
    onChangeSignInType: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.sendEmailSecurityCodeReducer.loading || state.authentication.validateEmailSecurityCodeReducer.loading || state.authentication.signInWithEmailReducer.loading,
    signInError: state.authentication.signInWithEmailReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    signInWithEmail: authenticationOperations.signInWithEmail,
};

// Export Class
const _SignInWithEmailForm = connect(mapStateToProps, mapDispatchToProps)(SignInWithEmailForm);
export {_SignInWithEmailForm as SignInWithEmailForm};
