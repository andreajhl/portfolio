import React, {Component} from 'react';
import {authenticationOperations} from "../../../state/ducks/authentication";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {connect} from "react-redux";

class ValidateEmailSecurityCodeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.validateIfEmailIsRegisteredData.email,
            securityCode: ""
        };

        this.handleInput = this.handleInput.bind(this);
        this.validateEmailSecurityCode = this.validateEmailSecurityCode.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(): void {
        if(!this.props.validateIfEmailIsRegisteredData.email) {
            history.goBack()
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.validateEmailSecurityCode();
        }
    };

    validateEmailSecurityCode(e) {
        if (!this.props.validateEmailSecurityCodeLoading) {
            this.props.validateEmailSecurityCode({
                email: this.state.email,
                securityCode: this.state.securityCode
            });
        }
    }

    goBack(){
        history.goBack()
    }

    render() {
        return (
            <div className="ValidateEmailSecurityCodeForm">
                <h6>Ingresar código</h6>
                <div className="mt-4">
                    <h6>¿Este no es tu correo? <b>{this.state.email}</b></h6>
                    <button className="btn btn-sm btn-outline-primary mb-4"
                            onClick={this.goBack}>
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
                    this.props.validateEmailSecurityCodeError
                    &&
                    <p className="instructions mt-4 text-danger">
                        {this.props.validateEmailSecurityCodeError}
                    </p>
                }
                <button className="send-button"
                        disabled={!this.state.securityCode}
                        onClick={this.validateEmailSecurityCode}
                >
                    {
                        this.props.validateEmailSecurityCodeLoading
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
ValidateEmailSecurityCodeForm.propTypes = {};

// Set defaultProps
ValidateEmailSecurityCodeForm.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    // validateIfEmailIsRegistered
    validateIfEmailIsRegisteredData: state.authentication.validateIfEmailIsRegisteredReducer.data,
    // validateEmailSecurityCode
    validateEmailSecurityCodeLoading: state.authentication.validateEmailSecurityCodeReducer.loading,
    validateEmailSecurityCodeCompleted: state.authentication.validateEmailSecurityCodeReducer.completed,
    validateEmailSecurityCodeError: state.authentication.validateEmailSecurityCodeReducer.error_data.error,
    validateEmailSecurityCodeData: state.authentication.validateEmailSecurityCodeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    validateEmailSecurityCode: authenticationOperations.validateEmailSecurityCode,
};

// Export Class
const _ValidateEmailSecurityCodeForm = connect(mapStateToProps, mapDispatchToProps)(ValidateEmailSecurityCodeForm);
export {_ValidateEmailSecurityCodeForm as ValidateEmailSecurityCodeForm};
