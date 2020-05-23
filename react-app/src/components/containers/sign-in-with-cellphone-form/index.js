import React, {Component} from 'react';
import "./styles.scss";
import {FlagsSelect} from "../../layouts/flags-select";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {AuthTCLayout} from "../../layouts/auth-t&c";
import {getUTMs} from "../../../state/utils/UTMs";
import {SignInMethodsForm} from "../sign-in-methods-form";
import * as GTM from "../../../state/utils/gtm";

class SignInWithCellphoneForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryAlpha3Code: "COL",
            countryCellphoneCode: "+57",
            cellphoneNumber: "",
        };

        this.handleInput = this.handleInput.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.sendSMSSecurityCode = this.sendSMSSecurityCode.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onSelectCountry(country) {
        this.setState({
            countryCellphoneCode: "+" + country.callingCodes[0],
            countryAlpha3Code: country.alpha3Code
        })
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }


    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.sendSMSSecurityCode();
        }
    };

    sendSMSSecurityCode(e) {
        if (!this.props.sendSMSSecurityCodeLoading) {
            const data = {
                ...getUTMs(),
                countryAlpha3Code: this.state.countryAlpha3Code,
                countryCellphoneCode: this.state.countryCellphoneCode,
                cellphoneNumber: this.state.cellphoneNumber,
            };
            this.props.sendSMSSecurityCode(data);
            GTM.tagManagerDataLayer(
                "CLICK_ON_SEND_SMS_SECURITY_CODE",
                data
            );
        }
    }

    render() {
        return (
            <div className="SignInWithCellphoneForm">
                <h6>{this.props.title}</h6>
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
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
                {
                    this.props.sendSMSSecurityCodeError
                    &&
                    <p className="instructions mt-4 text-danger">
                        {this.props.sendSMSSecurityCodeError}
                    </p>
                }
                <button
                    className="send-button"
                    disabled={!this.state.cellphoneNumber}
                    onClick={this.sendSMSSecurityCode}
                >
                    {
                        this.props.sendSMSSecurityCodeLoading
                            ?
                            <span className="text-white spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                            />
                            :
                            <span className={"text-white"}>Continuar</span>

                    }
                </button>
                <p className="instructions">
                    Enviaremos un mensaje de texto a este número con un código de confirmación
                </p>
                <SignInMethodsForm whatsapp={true} email={true} signUp={this.props.signUp}/>
                <AuthTCLayout/>
            </div>
        );
    };

}

// Set propTypes
SignInWithCellphoneForm.propTypes = {};

// Set defaultProps
SignInWithCellphoneForm.defaultProps = {
    signUp: false,
    title: "Ingresa con tu número de celular"
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    sendSMSSecurityCodeLoading: state.authentication.sendSMSSecurityCodeReducer.loading,
    sendSMSSecurityCodeCompleted: state.authentication.sendSMSSecurityCodeReducer.completed,
    sendSMSSecurityCodeError: state.authentication.sendSMSSecurityCodeReducer.error_data.error,
    sendSMSSecurityCodeData: state.authentication.sendSMSSecurityCodeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    sendSMSSecurityCode: authenticationOperations.sendSMSSecurityCode,
};

// Export Class
const _SignInWithCellphoneForm = connect(mapStateToProps, mapDispatchToProps)(SignInWithCellphoneForm);
export {_SignInWithCellphoneForm as SignInWithCellphoneForm};
