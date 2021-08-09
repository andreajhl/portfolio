import React, { Component } from "react";

import { FlagsSelect } from "../../layouts/flags-select";
import { celebrityRequestOperations } from "../../../state/ducks/celebrity-requests";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { withRouter } from "react-app/src/components/common/routing";
import { FormattedMessage, injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
  placeholderFullNameInput: { defaultMessage: "Escribe tu nombre" },
  placeholderSubdomainInput: {
    defaultMessage: "Escribe tu pagina exclusiva Ej: /andresito",
  },
  placeholderEmailInput: { defaultMessage: "Escribe tu correo electrónico" },
  placeholderReferralInput: { defaultMessage: "Codigo de referido" },
  placeholderSocialNetworksInput: {
    defaultMessage: "¿Como te encontramos? Ej: andresito",
  },
  otherSocialNetwork: {
    defaultMessage: "Otra",
    description: "Otra red social",
  },
});

class CelebrityRequestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        countryAlpha3Code: "COL",
        countryCellphoneCode: "+57",
        cellphoneNumber: "",
        fullName: "",
        subDomain: "",
        email: "",
        socialNetworkName: "",
        socialNetworkUsername: "",
        referral:
          new URLSearchParams(this.props.location.search).get("r") || "",
      },
      errors: {
        fullNameError: false,
        subDomainError: false,
        emailError: false,
        cellphoneNumberError: false,
        socialNetworkNameError: false,
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.onSelectCountry = this.onSelectCountry.bind(this);
    this.saveCelebrityRequest = this.saveCelebrityRequest.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    window.location.reload();
  }

  onSelectCountry(country) {
    console.log(country);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        countryCellphoneCode: "+" + country.callingCodes[0],
        countryAlpha3Code: country.alpha3Code,
      },
    });
  }

  onCellphoneChange = (phone, val) => {
    const { dialCode } = val;
    const cellphoneNumber = phone.substring(dialCode.length, phone.length);
    this.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        countryCellphoneCode: "+" + dialCode,
        cellphoneNumber,
        // countryAlpha3Code: country.alpha3Code
      },
    }));
  };

  handleInput(event) {
    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({ data });
  }

  isAValidForm() {
    return (
      this.state.data.fullName &&
      this.state.data.subDomain &&
      this.state.data.email &&
      this.state.data.cellphoneNumber &&
      this.state.data.socialNetworkName
    );
  }

  saveCelebrityRequest(event) {
    event?.preventDefault?.();
    let fullNameError = false;
    let subDomainError = false;
    let emailError = false;
    let cellphoneNumberError = false;
    let socialNetworkNameError = false;

    if (!this.state.data.fullName) {
      fullNameError = true;
    }
    if (!this.state.data.subDomain) {
      subDomainError = true;
    }
    if (!this.state.data.email) {
      emailError = true;
    }
    if (!this.state.data.cellphoneNumber) {
      cellphoneNumberError = true;
    }
    if (!this.state.data.socialNetworkName) {
      socialNetworkNameError = true;
    }

    this.setState({
      errors: {
        fullNameError,
        subDomainError,
        emailError,
        cellphoneNumberError,
        socialNetworkNameError,
      },
    });
    if (this.isAValidForm()) {
      this.props.saveCelebrityRequest(this.state.data);
    }
  }

  renderForm() {
    return (
      <form id="apply-as-celebrity-form" onSubmit={this.saveCelebrityRequest}>
        <h4 className="font-weight-bold text-center mb-4">
          <FormattedMessage defaultMessage="Regístrate y reserva tu pagina exclusiva en Famosos.com" />
        </h4>
        <label className="">
          <FormattedMessage defaultMessage="Nombre" />
          <small className="text-danger ml-1">*</small>
        </label>
        <input
          type="text"
          className={
            "form-control mb-3" +
            (this.state.errors.fullNameError ? " border-danger " : "")
          }
          placeholder={this.props.intl.formatMessage(
            messages.placeholderFullNameInput
          )}
          name="fullName"
          onChange={this.handleInput}
          value={this.state.data.fullName}
        />
        <label className="">
          <FormattedMessage defaultMessage="Pagina exclusiva" />
          <small className="text-danger ml-1">*</small>
        </label>
        <div className="form-horizontal">
          <input
            disabled={true}
            className={"form-control mb-3"}
            value="famosos.com/"
            style={{ flex: 1.2 }}
          />
          <input
            type="text"
            className={
              "form-control mb-3" +
              (this.state.errors.subDomainError ? " border-danger " : "")
            }
            placeholder={this.props.intl.formatMessage(
              messages.placeholderSubdomainInput
            )}
            name="subDomain"
            onChange={this.handleInput}
            value={this.state.data.subDomain}
            style={{ flex: 2 }}
          />
        </div>
        <label className="">
          <FormattedMessage defaultMessage="Correo electrónico" />
          <small className="text-danger ml-1">*</small>
        </label>
        <input
          type="email"
          className={
            "form-control mb-3" +
            (this.state.errors.emailError ? " border-danger " : "")
          }
          placeholder={this.props.intl.formatMessage(
            messages.placeholderEmailInput
          )}
          name="email"
          onChange={this.handleInput}
          value={this.state.data.email}
        />
        <label className="">
          <FormattedMessage defaultMessage="Télefono de contacto" />
        </label>
        <PhoneInput
          enableSearch={true}
          country={this.state.data.countryCode}
          value={
            this.state.data.countryCellphoneCode.slice(1) +
            this.state.data.cellphoneNumber
          }
          containerClass="mb-3"
          inputClass={
            this.state.errors.cellphoneNumberError ? "border-danger" : ""
          }
          dropdownClass={
            this.state.errors.cellphoneNumberError ? "border-danger" : ""
          }
          onChange={this.onCellphoneChange}
        />
        <label className="">
          <FormattedMessage defaultMessage="Red Social" />
          <small className="text-danger ml-1">*</small>
        </label>
        <div className="form-horizontal">
          <select
            className={
              "form-control mb-3" +
              (this.state.errors.socialNetworkNameError
                ? " border-danger "
                : "")
            }
            style={{ flex: 1 }}
            name="socialNetworkName"
            onChange={this.handleInput}
            value={this.state.data.socialNetworkName}
          >
            <option>---</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Twitter</option>
            <option>Youtube</option>
            <option>TikTok</option>
            <option>
              {this.props.intl.formatMessage(messages.otherSocialNetwork)}
            </option>
          </select>
          <input
            type="text"
            className={
              "form-control" +
              (this.state.errors.socialNetworkUsernameError
                ? " border-danger "
                : "")
            }
            placeholder={this.props.intl.formatMessage(
              messages.placeholderSocialNetworksInput
            )}
            name="socialNetworkUsername"
            onChange={this.handleInput}
            value={this.state.data.socialNetworkUsername}
            style={{ flex: 2 }}
          />
        </div>
        {this.state.data.referral && (
          <>
            <label className="mt-3">
              <FormattedMessage defaultMessage="Referido por:" />
            </label>
            <input
              disabled={true}
              type="text"
              className={
                "form-control" +
                (this.state.errors.referralError ? " border-danger " : "")
              }
              placeholder={this.props.intl.formatMessage(
                messages.placeholderReferralInput
              )}
              name="referral"
              onChange={this.handleInput}
              value={this.state.data.referral}
            />
          </>
        )}
        {this.props.saveCelebrityRequestError && (
          <div className="instructions mt-4 text-danger">
            {this.props.saveCelebrityRequestError}
          </div>
        )}
        <button
          type="submit"
          className="send-button"
          disabled={!this.state.data.cellphoneNumber}
        >
          {this.props.saveCelebrityRequestLoading ? (
            <span
              className="text-white spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span className={"text-white"}>
              <FormattedMessage defaultMessage="Continuar" />
            </span>
          )}
        </button>
      </form>
    );
  }

  renderCongratsOne() {
    return (
      <>
        <h4 className="font-weight-bold text-center mb-4">
          <FormattedMessage defaultMessage=" ¡Tu solicitud ha sido enviada!" />
        </h4>
        <p className="mt-4">
          <FormattedMessage
            defaultMessage="Nuestro equipo analizará tu solicitud y se pondra en contacto contigo
          muy pronto."
          />
        </p>
        <div className={"text-center"}>
          <img src={"/assets/img/review.svg"} alt={"img"} width="300px" />
        </div>
        <div className={"text-center mt-4"}>
          <button className="btn btn-primary mt-4 mb-4" onClick={this.close}>
            <FormattedMessage defaultMessage="Cerrar" />
          </button>
        </div>
      </>
    );
  }

  renderCongratsTwo() {
    return (
      <>
        <h4 className="font-weight-bold text-center mb-4">
          <FormattedMessage defaultMessage="¡Tu solicitud ha sido enviada!" />
        </h4>
        <p className="mt-4">
          <FormattedMessage
            defaultMessage="Nuestro equipo analizará tu solicitud y se pondrá en contacto contigo
          muy pronto."
          />
        </p>
        <p className="text-justify">
          <span className="font-weight-bold mr-2">
            <FormattedMessage defaultMessage="Nota:" />
          </span>{" "}
          <FormattedMessage
            defaultMessage="Si utilizas el
          link de referido de uno de los Famosos registrados en la plataforma
          tendrás más oportunidades de ser aprobado, este link es único por
          cuenta y está disponible en la sección de Mi Perfil de la aplicación
          de los Famosos."
          />
        </p>
        <div className={"text-center"}>
          <img src={"/assets/img/review.svg"} alt={"img"} width="300px" />
        </div>
        <div className={"text-center mt-4"}>
          <button className="btn btn-primary mt-4 mb-4" onClick={this.close}>
            <FormattedMessage defaultMessage="Cerrar" />
          </button>
        </div>
      </>
    );
  }

  renderContent() {
    if (
      !this.props.saveCelebrityRequestCompleted ||
      this.props.saveCelebrityRequestError
    ) {
      return this.renderForm();
    } else if (
      this.props.saveCelebrityRequestData.option === "REGISTERED_WITH_REFERRAL"
    ) {
      window.scroll({ top: 0 });
      return this.renderCongratsOne();
    } else if (
      this.props.saveCelebrityRequestData.option ===
      "REGISTERED_WITHOUT_REFERRAL"
    ) {
      window.scroll({ top: 0 });
      return this.renderCongratsTwo();
    }
  }

  render() {
    return <div className="CelebrityRequestForm">{this.renderContent()}</div>;
  }
}

// Set propTypes
CelebrityRequestForm.propTypes = {};

// Set defaultProps
CelebrityRequestForm.defaultProps = {
  signUp: false,
};

// mapStateToProps
const mapStateToProps = (state) => ({
  saveCelebrityRequestLoading:
    state.celebrityRequests.saveCelebrityRequestReducer.loading,
  saveCelebrityRequestCompleted:
    state.celebrityRequests.saveCelebrityRequestReducer.completed,
  saveCelebrityRequestError:
    state.celebrityRequests.saveCelebrityRequestReducer.error_data.error,
  saveCelebrityRequestData:
    state.celebrityRequests.saveCelebrityRequestReducer.data.data,
});

// mapStateToProps
const mapDispatchToProps = {
  saveCelebrityRequest: celebrityRequestOperations.saveRequest,
};

// Export Class
const _CelebrityRequestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(CelebrityRequestForm)));

export { _CelebrityRequestForm as CelebrityRequestForm };
