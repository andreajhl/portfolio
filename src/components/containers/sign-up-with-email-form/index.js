import React, {Component} from 'react';
import "./styles.scss";
import * as PropTypes from "prop-types";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class SignUpWithEmailForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryAlpha3Code: "COL",
            countryCellphoneCode: "+57",
            email: this.props.email,
            securityCode: "",
            showForm1: true
        };

        this.onChangeSignInType = this.onChangeSignInType.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.sendEmailSecurityCode = this.sendEmailSecurityCode.bind(this);
        this.validateEmailSecurityCode = this.validateEmailSecurityCode.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.showForm1 = this.showForm1.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.securityCodeSent === true && this.props.securityCodeSent !== nextProps.securityCodeSent) {
            this.setState({showForm1: false})
        }
    }

    showForm1() {
        this.setState({showForm1: !this.state.showForm1})
    }

    onSelectCountry(country) {
        this.setState({
            countryCellphoneCode: "+" + country.callingCodes[0],
            countryAlpha3Code: country.alpha3Code
        })
    }

    onChangeSignInType() {
        this.props.onChangeSignInType("cellphone");
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    sendEmailSecurityCode(e) {
        if (!this.props.isLoading) {
            let search = history.location.search;
            let params = new URLSearchParams(search);
            const utmSource = params.get("utm_source");
            const utmMedium = params.get("utm_medium");
            const utmCampaign = params.get("utm_campaign");
            const utmTerm = params.get("utm_term");
            const utmContent = params.get("utm_content");
            const data = {
                showForm1: true,
                email: this.state.email,
                utmSource: utmSource,
                utmMedium: utmMedium,
                utmCampaign: utmCampaign,
                utmTerm: utmTerm,
                utmContent: utmContent,
            };
            this.props.sendEmailSecurityCode(data);
        }
    }

    validateEmailSecurityCode(e) {
        if (!this.props.isLoading) {
            this.props.validateEmailSecurityCode({
                email: this.state.email,
                securityCode: this.state.securityCode
            }, PATHS.CREATE_PASSWORD_PATH)
        }
    }

    goToLogin() {
        history._pushRoute(PATHS.SIGN_IN_PATH)
    }

    render() {
        return (
            <div className="SignUpWithEmailForm">
                {
                    this.state.showForm1
                        ?
                        <>
                            <h6>Ingresa con tú correo electrónico</h6>
                            <div className="form-horizontal">
                                <input
                                    autoFocus={true}
                                    type="email"
                                    className="form-control"
                                    placeholder="Escribe tu correo"
                                    name="email"
                                    onChange={this.handleInput}
                                    value={this.state.email}
                                />
                            </div>
                            {
                                this.props.securityCodeError
                                    ?
                                    <p className="instructions mt-4 text-danger">
                                        {this.props.securityCodeError}
                                    </p>
                                    : null
                            }
                            <button className="send-button"
                                    disabled={!this.state.email}
                                    onClick={this.sendEmailSecurityCode}
                            >
                                {
                                    this.props.isLoading
                                        ?
                                        <span className="text-white spinner-grow spinner-grow-sm"
                                              role="status"
                                              aria-hidden="true"
                                        />
                                        :
                                        <span className="text-white">Enviar</span>

                                }
                            </button>
                            <p className="instructions">
                                Enviaremos un correo a este correo electrónico con un código de confirmación
                            </p>
                            <div className="mb-4 pb-4">
                                <div className="mt-2 float-right cursor-pointer">
                                    <small className="text-muted" onClick={this.goToLogin}>Ya tengo una cuenta</small>
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
                        :
                        <>
                            <h6>Ingresar código</h6>
                            <div className="mt-4">
                                <h6>¿Este no es tu correo? <b>{this.state.email}</b></h6>
                                <button className="btn btn-sm btn-outline-primary mb-4"
                                        onClick={this.showForm1}>
                                    Cambiar
                                </button>
                            </div>
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
                            <p className="instructions">
                                {/*Volver a enviar mensaje de WhatsApp en: <b>58:11</b>*/}
                            </p>
                        </>
                }
            </div>
        );
    };

}

// Set propTypes
SignUpWithEmailForm.propTypes = {
    onChangeSignInType: PropTypes.func.isRequired,
};

// Set defaultProps
SignUpWithEmailForm.defaultProps = {
    email: "",
    onChangeSignInType: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.sendEmailSecurityCodeReducer.loading || state.authentication.validateEmailSecurityCodeReducer.loading,
    securityCodeSent: state.authentication.sendEmailSecurityCodeReducer.completed,
    securityCodeError: state.authentication.sendEmailSecurityCodeReducer.error_data.error,
    validateSecurityCodeError: state.authentication.validateEmailSecurityCodeReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    sendEmailSecurityCode: authenticationOperations.sendEmailSecurityCode,
    validateEmailSecurityCode: authenticationOperations.validateEmailSecurityCode,
};

// Export Class
const _SignUpWithEmailForm = connect(mapStateToProps, mapDispatchToProps)(SignUpWithEmailForm);
export {_SignUpWithEmailForm as SignUpWithEmailForm};
