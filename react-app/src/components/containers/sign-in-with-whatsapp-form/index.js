import React, { Component } from "react";
import "./styles.scss";
import { FlagsSelect } from "../../layouts/flags-select";
import { authenticationOperations } from "../../../state/ducks/authentication";
import { connect } from "react-redux";
import { AuthTCLayout } from "../../layouts/auth-t&c";
import { getUTMs } from "../../../state/utils/UTMs";
import { SignInMethodsForm } from "../sign-in-methods-form";

class SignInWithWhatsAppForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryAlpha3Code: "COL",
      countryWhatsAppCode: "+57",
      cellphoneNumber: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.onSelectCountry = this.onSelectCountry.bind(this);
    this.sendSMSSecurityCode = this.sendSMSSecurityCode.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onSelectCountry(country) {
    this.setState({
      countryWhatsAppCode: "+" + country.callingCodes[0],
      countryAlpha3Code: country.alpha3Code
    });
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendSMSSecurityCode();
    }
  };

  sendSMSSecurityCode(e) {
    if (!this.props.sendSMSSecurityCodeLoading) {
      this.props.sendSMSSecurityCode({
        ...getUTMs(),
        countryAlpha3Code: this.state.countryAlpha3Code,
        countryWhatsAppCode: this.state.countryWhatsAppCode,
        cellphoneNumber: this.state.cellphoneNumber
      });
    }
  }

  render() {
    return (
      <div className="SignInWithWhatsAppForm">
        <h6>Ingresa con tu WhatsApp</h6>
        <div className="form-horizontal">
          <FlagsSelect onSelect={this.onSelectCountry} />
          <input
            type="number"
            className="form-control"
            placeholder="Escribe tu número"
            name="cellphoneNumber"
            onChange={this.handleInput}
            value={this.state.cellphoneNumber}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        {this.props.sendSMSSecurityCodeError && (
          <p className="instructions mt-4 text-danger">
            {this.props.sendSMSSecurityCodeError}
          </p>
        )}
        <button
          className="send-button"
          disabled={!this.state.cellphoneNumber}
          onClick={this.sendSMSSecurityCode}
        >
          {this.props.sendSMSSecurityCodeLoading ? (
            <span
              className="text-white spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span className={"text-white"}>Continuar</span>
          )}
        </button>
        <p className="instructions">
          Enviaremos un mensaje a tu WhatsApp con un código de confirmación
        </p>
        <SignInMethodsForm
          cellphone={true}
          email={true}
          signUp={this.props.signUp}
        />
        <AuthTCLayout />
      </div>
    );
  }
}

// Set propTypes
SignInWithWhatsAppForm.propTypes = {};

// Set defaultProps
SignInWithWhatsAppForm.defaultProps = {
  signUp: false
};

// mapStateToProps
const mapStateToProps = (state) => ({
  sendSMSSecurityCodeLoading:
    state.authentication.sendSMSSecurityCodeReducer.loading,
  sendSMSSecurityCodeCompleted:
    state.authentication.sendSMSSecurityCodeReducer.completed,
  sendSMSSecurityCodeError:
    state.authentication.sendSMSSecurityCodeReducer.error_data.error,
  sendSMSSecurityCodeData: state.authentication.sendSMSSecurityCodeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  sendSMSSecurityCode: authenticationOperations.sendSMSSecurityCode
};

// Export Class
const _SignInWithWhatsAppForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInWithWhatsAppForm);
export { _SignInWithWhatsAppForm as SignInWithWhatsAppForm };
