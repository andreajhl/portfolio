import React, {Component} from 'react';
import "./styles.scss";
import {authenticationOperations} from "../../../state/ducks/authentication";
import {connect} from "react-redux";
import {AuthTCLayout} from "../../layouts/auth-t&c";
import {getUTMs} from "../../../state/utils/UTMs";
import {SignInMethodsForm} from "../sign-in-methods-form";
import * as GTM from "../../../state/utils/gtm";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import apiService from "../../../state/utils/apiService";

class SignInWithCellphoneForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showInput: false,
            _phone: "",
            countryCode: "us",
            dialCode: "+57",
            cellphoneNumber: "",
        };
        this.sendSMSSecurityCode = this.sendSMSSecurityCode.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.getUserCountry();
    }

    async getUserCountry() {
        const FINAL_PATH = "custom-endpoints/countries/ip-parse";
        await apiService({
            method: "GET",
            action: null,
            path: FINAL_PATH,
            async: true,
            params: null,
            custom_endpoint: false
        })
            .then(res => {
                if (res.data.status === "OK") {
                    if (res.data["data"]["countryCode"] !== "") {
                        this.setState({
                            ...this.state,
                            showInput: true,
                            countryCode: res.data["data"]["countryCode"].toLowerCase(),
                        })
                    }
                }
            })
            .catch(error => {

            });
    }

    onCellphoneChange = (dialCode, cellphoneNumber) => {
        this.setState({
            dialCode: "+" + dialCode,
            cellphoneNumber: cellphoneNumber,
        });
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.sendSMSSecurityCode();
        }
    };

    sendSMSSecurityCode(e) {
        if (!this.props.sendSMSSecurityCodeLoading) {
            const data = {
                ...getUTMs(),
                dialCode: this.state.dialCode,
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
                <form>
                    <h6>{this.props.title}</h6>
                    <PhoneInput
                        enableSearch={true}
                        country={this.state.countryCode}
                        value={this.state._phone}
                        className={"form-control"}
                        onChange={(phone, val) => {
                            this.onCellphoneChange(val["dialCode"], phone.substring(val["dialCode"].length, phone.length));
                        }}
                    />
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
                </form>
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
const mapStateToProps = (state) => ({
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
