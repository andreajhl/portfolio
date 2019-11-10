import React, {Component} from 'react';
import {authenticationOperations} from "../../../state/ducks/authentication";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {connect} from "react-redux";

class ValidateWhatsAppSecurityCodeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryAlpha3Code: this.props.sendSMSSecurityCodeData.countryAlpha3Code,
            countryCellphoneCode: this.props.sendSMSSecurityCodeData.countryCellphoneCode,
            cellphoneNumber: this.props.sendSMSSecurityCodeData.cellphoneNumber,
            securityCode: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.validateSMSSecurityCode = this.validateSMSSecurityCode.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(): void {
        if(!this.state.cellphoneNumber) {
            history.goBack()
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.sendSMSSecurityCode();
        }
    };

    validateSMSSecurityCode(e) {
        if (!this.props.validateSMSSecurityCodeLoading) {
            this.props.validateSMSSecurityCode({
                countryAlpha3Code: this.state.countryAlpha3Code,
                countryCellphoneCode: this.state.countryCellphoneCode,
                cellphoneNumber: this.state.cellphoneNumber,
                securityCode: this.state.securityCode
            });
        }
    }

    render() {
        return (
            <div className="ValidateWhatsAppSecurityCodeForm">
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
                    onKeyPress={this.handleKeyPress}
                />
                {
                    this.props.validateSMSSecurityCodeError
                    &&
                    <p className="instructions mt-4 text-danger">
                        {this.props.validateSMSSecurityCodeError}
                    </p>
                }
                <button className="send-button"
                        disabled={!this.state.securityCode}
                        onClick={this.validateSMSSecurityCode}
                >
                    {
                        this.props.validateSMSSecurityCodeLoading
                            ?
                            <span className="text-white spinner-grow spinner-grow-sm"
                                  role="status"
                                  aria-hidden="true"
                            />
                            :
                            <span className="text-white">Continuar</span>

                    }
                </button>
            </div>
        );
    };

}

// Set propTypes
ValidateWhatsAppSecurityCodeForm.propTypes = {};

// Set defaultProps
ValidateWhatsAppSecurityCodeForm.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    // sendSMSSecurityCode
    sendSMSSecurityCodeData: state.authentication.sendSMSSecurityCodeReducer.data,
    // validateSMSSecurityCode
    validateSMSSecurityCodeLoading: state.authentication.validateSMSSecurityCodeReducer.loading,
    validateSMSSecurityCodeCompleted: state.authentication.validateSMSSecurityCodeReducer.completed,
    validateSMSSecurityCodeError: state.authentication.validateSMSSecurityCodeReducer.error_data.error,
    validateSMSSecurityCodeData: state.authentication.validateSMSSecurityCodeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    validateSMSSecurityCode: authenticationOperations.validateSMSSecurityCode,
};

// Export Class
const _ValidateWhatsAppSecurityCodeForm = connect(mapStateToProps, mapDispatchToProps)(ValidateWhatsAppSecurityCodeForm);
export {_ValidateWhatsAppSecurityCodeForm as ValidateWhatsAppSecurityCodeForm};
