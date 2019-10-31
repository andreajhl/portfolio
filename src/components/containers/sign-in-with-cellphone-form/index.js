import React, {Component} from 'react';
import "./styles.scss";
import {FlagsSelect} from "../../layouts/flags-select";
import * as PropTypes from "prop-types";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {history} from "../../../routing/History";

class SignInWithCellphoneForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryAlpha3Code: "COL",
            countryCellphoneCode: "+57",
            cellphoneNumber: "",
            securityCode: "",
            showForm1: true
        };

        this.onChangeSignInType = this.onChangeSignInType.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.sendSMSSecurityCode = this.sendSMSSecurityCode.bind(this);
        this.validateSMSSecurityCode = this.validateSMSSecurityCode.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.showForm1 = this.showForm1.bind(this);
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
        this.props.onChangeSignInType("email");
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    sendSMSSecurityCode(e) {
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
                countryAlpha3Code: this.state.countryAlpha3Code,
                countryCellphoneCode: this.state.countryCellphoneCode,
                cellphoneNumber: this.state.cellphoneNumber,
                utmSource: utmSource,
                utmMedium: utmMedium,
                utmCampaign: utmCampaign,
                utmTerm: utmTerm,
                utmContent: utmContent,
            };
            this.props.sendSMSSecurityCode(data);
        }
    }

    validateSMSSecurityCode(e) {
        if (!this.props.isLoading) {
            this.props.validateSMSSecurityCode({
                countryAlpha3Code: this.state.countryAlpha3Code,
                countryCellphoneCode: this.state.countryCellphoneCode,
                cellphoneNumber: this.state.cellphoneNumber,
                securityCode: this.state.securityCode
            })
        }
    }

    render() {
        return (
            <div className="SignInWithCellphoneForm">
                {
                    this.state.showForm1
                        ?
                        <>
                            <h6>Ingresa con tú número de celular</h6>
                            <div className="form-horizontal">
                                <FlagsSelect
                                    onSelect={this.onSelectCountry}
                                />
                                <input
                                    autoFocus={true}
                                    type="number"
                                    className="form-control"
                                    placeholder="Escribe tu número"
                                    name="cellphoneNumber"
                                    onChange={this.handleInput}
                                    value={this.state.cellphoneNumber}
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
                                    disabled={!this.state.cellphoneNumber}
                                    onClick={this.sendSMSSecurityCode}
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
                                Enviaremos un mensaje de texto a este número con un código de confirmación
                            </p>
                            <div className="login-type-button" onClick={this.onChangeSignInType}>
                                Ingresar con Email
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
                                <h6>¿Este no es tu número? <b>{this.state.cellphoneNumber}</b></h6>
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
                                    onClick={this.validateSMSSecurityCode}
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
SignInWithCellphoneForm.propTypes = {
    onChangeSignInType: PropTypes.func.isRequired,
};

// Set defaultProps
SignInWithCellphoneForm.defaultProps = {
    onChangeSignInType: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.authentication.sendSMSSecurityCodeReducer.loading || state.authentication.validateSMSSecurityCodeReducer.loading,
    securityCodeSent: state.authentication.sendSMSSecurityCodeReducer.completed,
    securityCodeError: state.authentication.sendSMSSecurityCodeReducer.error_data.error,
    validateSecurityCodeError: state.authentication.validateSMSSecurityCodeReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    sendSMSSecurityCode: authenticationOperations.sendSMSSecurityCode,
    validateSMSSecurityCode: authenticationOperations.validateSMSSecurityCode,
};

// Export Class
const _SignInWithCellphoneForm = connect(mapStateToProps, mapDispatchToProps)(SignInWithCellphoneForm);
export {_SignInWithCellphoneForm as SignInWithCellphoneForm};
