import React, {Component} from 'react';
import "./styles.scss";
import * as PropTypes from "prop-types";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class ResetPasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            securityCode: "",
            showForm1: true
        };

        this.onChangeSignInType = this.onChangeSignInType.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.validateEmailSecurityCode = this.validateEmailSecurityCode.bind(this);
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

    resetPassword(e) {
        if (!this.props.isLoading) {
            const data = {
                email: this.state.email,
            };
            this.props.resetPassword(data);
        }
    }

    goToLogin() {
        history.push(PATHS.SIGN_IN_PATH)
    }

    validateEmailSecurityCode(e) {
        if (!this.props.isLoading) {
            this.props.validateEmailSecurityCode({
                email: this.state.email,
                securityCode: this.state.securityCode
            }, PATHS.CHANGE_PASSWORD_PATH)
        }
    }

    render() {
        return (
            <div className="LoginWithEmailForm">
                {
                    !this.props.resetPasswordSent
                        ?
                        <>
                            <h6>Ingresa con tú correo electrónico</h6>
                            <input
                                autoFocus={true}
                                type="email"
                                className="form-control"
                                placeholder="Escribe tu correo"
                                name="email"
                                onChange={this.handleInput}
                                value={this.state.email}
                            />
                            {
                                this.props.resetPasswordError
                                    ?
                                    <p className="instructions mt-4 text-danger">
                                        {this.props.resetPasswordError}
                                    </p>
                                    : null
                            }
                            <button className="send-button"
                                    disabled={!this.state.email}
                                    onClick={this.resetPassword}
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
                            <p className="instructions">
                                Enviaremos un correo con un código de confirmación
                            </p>
                            <div className="login-type-button" onClick={this.goToLogin}>
                                Volver a Iniciar Sesión
                            </div>
                        </>
                        :
                        <>
                            <h6>Ingresar código</h6>
                            <input
                                autoFocus={true}
                                type="number"
                                className="form-control"
                                placeholder="# # # # # #"
                                name="securityCode"
                                onChange={this.handleInput}
                                value={this.state.securityCode}
                            />
                            {
                                this.props.validateSecurityCodeError
                                    ?
                                    <p className="instructions mt-4 text-danger">
                                        {this.props.validateSecurityCodeError}
                                    </p>
                                    : null
                            }
                            <button className="send-button"
                                    disabled={!this.state.securityCode}
                                    onClick={this.validateEmailSecurityCode}
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
                            <div className="login-type-button" onClick={this.goToLogin}>
                                Volver a Iniciar Sesión
                            </div>
                        </>
                }
            </div>
        );
    };

}

// Set propTypes
ResetPasswordForm.propTypes = {
    onChangeSignInType: PropTypes.func.isRequired,
};

// Set defaultProps
ResetPasswordForm.defaultProps = {
    onChangeSignInType: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.resetPasswordReducer.loading || state.authentication.validateEmailSecurityCodeReducer.loading,
    resetPasswordSent: state.authentication.resetPasswordReducer.completed,
    resetPasswordError: state.authentication.resetPasswordReducer.error_data.error,
    validateSecurityCodeError: state.authentication.validateEmailSecurityCodeReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    resetPassword: authenticationOperations.resetPassword,
    validateEmailSecurityCode: authenticationOperations.validateEmailSecurityCode,
};

// Export Class
const _ResetPasswordForm = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
export {_ResetPasswordForm as ResetPasswordForm};
