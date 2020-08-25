import React, {Component} from 'react';
import {authenticationOperations} from "../../../state/ducks/authentication";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {connect} from "react-redux";

class ValidateCellphoneSecurityCodeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialCode: this.props.sendSMSSecurityCodeData.dialCode,
            cellphoneNumber: this.props.sendSMSSecurityCodeData.cellphoneNumber,
            securityCode: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.validateSMSSecurityCode = this.validateSMSSecurityCode.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        if(!this.state.cellphoneNumber) {
            history.goBack()
        }
    }

    goBack(){
        history.goBack()
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.validateSMSSecurityCode();
        }
    };

    validateSMSSecurityCode(e) {
        if (!this.props.validateSMSSecurityCodeLoading) {
            this.props.validateSMSSecurityCode({
                dialCode: this.state.dialCode,
                cellphoneNumber: this.state.cellphoneNumber,
                securityCode: this.state.securityCode
            });
        }
    }

    render() {
        return (
            <div className="ValidateCellphoneSecurityCodeForm">
                <h6>Ingresar código</h6>
                <div className="mt-4">
                    <h6>¿Este no es tu número? <b>{this.state.dialCode} {this.state.cellphoneNumber}</b></h6>
                    <button className="btn btn-sm btn-outline-primary mb-4"
                            onClick={this.goBack}>
                        Cambiar
                    </button>
                </div>
                <input
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
ValidateCellphoneSecurityCodeForm.propTypes = {};

// Set defaultProps
ValidateCellphoneSecurityCodeForm.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
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
const _ValidateCellphoneSecurityCodeForm = connect(mapStateToProps, mapDispatchToProps)(ValidateCellphoneSecurityCodeForm);
export {_ValidateCellphoneSecurityCodeForm as ValidateCellphoneSecurityCodeForm};
