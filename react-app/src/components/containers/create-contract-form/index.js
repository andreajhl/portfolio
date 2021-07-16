import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { contractOperations } from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import PhoneInput from "react-phone-input-2";
import OcassionsOptions from "../ocassions-options";
import { occasionsData } from "../../../constants/options";
import { getToken } from "react-app/src/state/ducks/session/actions";
import "react-phone-input-2/lib/style.css";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import isMobilePhone from "react-app/src/state/utils/isMobilePhone";
import { withRouter } from "next/router";
import { secure_payment_img } from "constants/external_assets_by_lang";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";

const intlMessages = defineMessages({
  instructionsPlaceholderForOther: {
    defaultMessage:
      "Ejemplo: Mi amiga Ana cumple años el 12 de agosto, me gustaría que la felicitaras."
  },
  instructionsPlaceholderForMe: {
    defaultMessage: "Mis instrucciones son"
  },
  deliveryContactPlaceholder: {
    defaultMessage: "correo@dominio.com"
  },
  deliveryContactCellphone: {
    defaultMessage: "Buscar país"
  },
  celebrityNameFallback: {
    defaultMessage: "Famoso!"
  },
  deliveryToFallback: {
    defaultMessage: "[PARA]"
  }
});

class CreateContractForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionsIsTouched: false,
      contractData: {
        celebrity: null,
        contractType: 1,
        deliveryFrom: "",
        deliveryTo: "",
        deliveryType: 1,
        deliveryContact: "",
        instructions: "",
        isPublic: true,
        occasion: "OTHER",
        deliveryContactCellphone: "",
        lang: transformUserNavigatorLanguageToISO2Code(this.props.router.locale)
      },
      deliveryContactCellphoneCountryCode: "co"
    };
    this.handleIsPublic = this.handleIsPublic.bind(this);
    this.createContract = this.createContract.bind(this);
    this.deliveryToInput = React.createRef();
    this.deliveryFromInput = React.createRef();
    this.deliveryFromMaxLength = 40;
    this.deliveryToMaxLength = 40;
    this.locale = this.props.router.locale;
  }

  componentDidMount() {
    if (
      this.props.contractToPayExist &&
      this.props.celebrityId === this.props.contractToPayData.celebrityId
    ) {
      this.setState({
        ...this.state,
        contractData: this.props.contractToPayData
      });
    } else {
      this.props.getToken();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.contractToPayExist !== this.props.contractToPayExist) {
      this.setState({
        ...this.state,
        contractData: this.props.contractToPayData
      });
    } else if (
      prevProps.sessionData?.userId !== this.props.sessionData?.userId
    ) {
      this.setState((state) => ({
        ...state,
        contractData: {
          ...state.contractData,
          deliveryTo:
            state.deliveryTo || this.props.sessionData?.fullName || "",
          deliveryContact:
            state.deliveryContact || this.props.sessionData?.email || ""
        }
      }));
    }
    // if (
    //   this.props.contractToPayExist &&
    //   this.props.celebrityId === this.props.contractToPayData.celebrityId
    // ) {
    //   this.setState({
    //     ...this.state,
    //     contractData: this.props.contractToPayData
    //   });
    // }
  }

  sendBusinessRequestGTMEvent = () => {
    GTM.tagManagerDataLayer("BUSINESS_REQUEST", this.props.celebrity);
    // window.open("https://wa.me/573212493718?text=" + encodeURI("¡Hola! Estoy interesada/o en contratar a " + this.props.celebrity.fullName + " para que grabe un Video para promocionar mi empresa. ¿Me podrías explicar el proceso?"), "_blank")
    window.open("https://landing-business.famosos.com/form", "_blank");
  };

  createContract() {
    this.setState({
      ...this.state,
      showErrors: false
    });
    if (
      this.deliveryFromValidator(true) ||
      this.deliveryToValidator(true) ||
      this.instructionsValidator() ||
      this.deliveryContactValidator() ||
      this.deliveryContactCellphoneValidator()
    ) {
      this.setState({
        ...this.state,
        showErrors: true
      });
    } else {
      if (
        this.props.contractToPayExist &&
        this.props.celebrityId === this.props.contractToPayData.celebrityId
      ) {
        const contractData = this.state.contractData;
        this.setState(
          {
            contractData: {
              ...contractData,
              deliveryType: contractData.deliveryType || 1
            }
          },
          () => {
            this.props.updateClientContract(this.state.contractData);
          }
        );
      } else {
        const contractData = this.state.contractData;
        contractData.celebrityId = this.props.celebrityId;
        GTM.tagManagerDataLayer("CONTRACT_CREATED", contractData);
        if (typeof window !== "undefined") {
          if (window.fbq != null) {
            window.fbq("track", "InitiateCheckout", {
              content_type: "product",
              content_ids:
                VIDEO_MESSAGE_PRODUCT_ID_PREFIX + this.props.celebrityId,
              value: this.props.contractPrice,
              currency: "USD"
            });
          }
        }
        this.setState(
          {
            contractData: {
              ...contractData,
              deliveryType: contractData.deliveryType || 1
            }
          },
          () => {
            this.props.saveClientContract(this.state.contractData);
          }
        );
      }
    }
  }

  onCellphoneChange = (cellphoneNumber, countryCode) => {
    this.setState((state) => ({
      ...state,
      contractData: {
        ...state.contractData,
        deliveryContactCellphone: cellphoneNumber
      },
      deliveryContactCellphoneCountryCode: countryCode
    }));
  };

  replacePlaceHolder = (text) => {
    const replacePlaceHolders = (str, find, replace) => {
      return str.replace(new RegExp(find, "g"), replace);
    };

    let textClear = text;
    const { formatMessage } = this.props.intl;

    textClear = replacePlaceHolders(
      textClear,
      "PLACEHOLDER_FAMOSO_NAME",
      this.props.celebrityFullName ||
        formatMessage(intlMessages.celebrityNameFallback)
    );

    textClear = replacePlaceHolders(
      textClear,
      "PLACEHOLDER_PARA",
      this.state.contractData.deliveryTo ||
        formatMessage(intlMessages.deliveryToFallback)
    );

    return textClear;
  };

  handleInputChange = (event) => {
    const updatedContractData = { ...this.state.contractData };
    if (event.target.value.length <= 400) {
      updatedContractData[event.target.name] = event.target.value;
      this.setState({
        ...this.state,
        contractData: updatedContractData
      });
    }
  };

  handleInstructionsChange = (event) => {
    this.handleInputChange(event);
    if (!this.state.instructionsIsTouched) {
      this.setState((state) => ({ ...state, instructionsIsTouched: true }));
    }
  };

  handleContractTypeChange = (value) => {
    const updatedContractData = { ...this.state.contractData };
    const oldMessage = this.replacePlaceHolder(
      occasionsData[this.locale][this.state.contractData.occasion]?.messages[
        this.state.contractData.contractType - 1
      ]
    );
    if (
      this.state.contractData.occasion === "" ||
      oldMessage === this.state.contractData.instructions
    ) {
      const newMessage = this.replacePlaceHolder(
        occasionsData[this.locale][this.state.contractData.occasion].messages[
          value - 1
        ]
      );
      updatedContractData.instructions = newMessage;
    }
    updatedContractData.contractType = parseInt(value);
    this.setState({
      ...this.state,
      contractData: updatedContractData
    });
  };

  handleIsPublic() {
    const contractData = { ...this.state.contractData };
    contractData.isPublic = !contractData.isPublic;
    this.setState({
      ...this.state,
      contractData: contractData
    });
  }

  deliveryFromValidator = (shouldFocus) => {
    if (this.state.contractData.contractType !== 2) return null;
    if (!this.state.contractData.deliveryFrom.length) {
      if (this.deliveryFromInput.current && shouldFocus) {
        this.deliveryFromInput.current.focus();
      }
      return <FormattedMessage defaultMessage="Campo requerido" />;
    }
    if (
      this.state.contractData.deliveryFrom.length > this.deliveryFromMaxLength
    ) {
      if (this.deliveryFromInput.current && shouldFocus) {
        this.deliveryFromInput.current.focus();
      }
      return (
        <FormattedMessage
          defaultMessage="Este campo excede el limite de {deliveryFromMaxLength} caracteres"
          values={{
            deliveryFromMaxLength: this.deliveryFromMaxLength
          }}
        />
      );
    }
    return null;
  };

  deliveryToValidator = (shouldFocus) => {
    if (!this.state.contractData.deliveryTo.length) {
      if (this.deliveryToInput.current && shouldFocus) {
        this.deliveryToInput.current.focus();
      }
      return <FormattedMessage defaultMessage="Campo requerido" />;
    }
    if (this.state.contractData.deliveryTo.length > this.deliveryToMaxLength) {
      if (this.deliveryToInput.current && shouldFocus) {
        this.deliveryToInput.current.focus();
      }
      return (
        <FormattedMessage
          defaultMessage="Este campo excede el limite de {deliveryToMaxLength} caracteres"
          values={{
            deliveryToMaxLength: this.deliveryToMaxLength
          }}
        />
      );
    }
    return null;
  };

  instructionsValidator = () => {
    if (!this.state.contractData.instructions.length) {
      return <FormattedMessage defaultMessage="Campo requerido" />;
    }
    return null;
  };

  changeOccasionOption = (occasionIdentifier) => {
    this.setState((state) => ({
      ...state,
      contractData: {
        ...state.contractData,
        occasion: occasionIdentifier,
        instructions: this.getInstructions(occasionIdentifier)
      }
    }));
  };

  deliveryContactValidator = () => {
    if (!this.state.contractData.deliveryContact.length) {
      return <FormattedMessage defaultMessage="Campo requerido" />;
    } else if (
      !this.state.contractData.deliveryContact.match(
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      )
    ) {
      return <FormattedMessage defaultMessage="Este correo no es válido" />;
    }
    return null;
  };

  deliveryContactCellphoneValidator = () => {
    try {
      if (this.state.contractData.deliveryContactCellphone !== "") {
        if (
          !isMobilePhone(
            String(`+${this.state.contractData.deliveryContactCellphone}`),
            this.state.deliveryContactCellphoneCountryCode
          )
        ) {
          return "Ingrese un numero telefónico valido";
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  getInstructions(occasionIdentifier) {
    return this.state.instructionsIsTouched
      ? this.state.contractData.instructions
      : this.replacePlaceHolder(
          occasionsData[this.props.router.locale][occasionIdentifier].messages[
            this.state.contractData.contractType - 1
          ]
        );
  }

  handleDeliveryNamesChange = (event) => {
    if (this.state.instructionsIsTouched) {
      this.handleInputChange(event);
    } else {
      const { name, value } = event.target;
      this.setState(
        (state) => ({
          ...state,
          contractData: {
            ...state.contractData,
            [name]: value
          }
        }),
        () => this.changeOccasionOption(this.state.contractData.occasion)
      );
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const contractData = { ...this.state.contractData };
    return (
      <div className="CreateContractForm">
        <div className={"form-container"}>
          {/* CELEBRITY DETAILS */}
          <div className="celebrity-details">
            <div className={"celebrity-avatar"}>
              <img
                src={
                  this.props.celebrityAvatar || `/assets/img/avatar-blank.png`
                }
                alt={"avatar"}
              />
            </div>
            <h5 className="celebrity-name">
              <FormattedMessage
                defaultMessage=" Video Personalizado de {celebrityFullName}"
                values={{
                  celebrityFullName: this.props.celebrityFullName
                }}
              />
            </h5>
          </div>

          {/* DELIVERY TO OPTIONS */}
          <div className="mt-3">
            <h6 className="subtitle">
              <FormattedMessage defaultMessage="¿Para quién es este video?" />
            </h6>
            <div
              className={"delivery-option"}
              onClick={(e) => {
                e.preventDefault();
                this.handleContractTypeChange(1);
              }}
            >
              <div className={"delivery-option-icon"}>
                <i className="far fa-grin-stars" />
              </div>
              <div className={"delivery-option-text"}>
                <span>
                  <FormattedMessage defaultMessage="Para mi" />
                </span>
              </div>
              <div className="delivery-option-control">
                <div
                  className={
                    "switch" +
                    (contractData.contractType === 1 ? " on " : " off ")
                  }
                >
                  <span className={"active"} />
                </div>
              </div>
            </div>
            <div
              className={"delivery-option"}
              onClick={(e) => {
                e.preventDefault();
                this.handleContractTypeChange(2);
              }}
            >
              <div className={"delivery-option-icon"}>
                <i className="fas fa-gift" />
              </div>
              <div className={"delivery-option-text"}>
                <span>
                  <FormattedMessage defaultMessage="Para un amigo o familiar" />
                </span>
              </div>
              <div className="delivery-option-control">
                <div
                  className={
                    "switch" +
                    (contractData.contractType === 2 ? " on " : " off ")
                  }
                >
                  <span className={"active"} />
                </div>
              </div>
            </div>
            <div className="business-option">
              <FormattedMessage
                defaultMessage="Si quieres un video comercial para tu marca haz click <span> aquí.</span>"
                values={{
                  span: (chunk) => (
                    <span
                      className={"text-primary"}
                      onClick={this.sendBusinessRequestGTMEvent}
                    >
                      {chunk}
                    </span>
                  )
                }}
              />
            </div>
          </div>
          <br />
          {/* FORM INPUTS */}
          <div className={"form-custom-horizontal-group"}>
            <div className={"form-custom-label"}>
              <label>
                <FormattedMessage defaultMessage="Para:" />
              </label>
            </div>
            <div className={"form-custom-input"}>
              <input
                type={"text"}
                placeholder={"Ana"}
                value={contractData.deliveryTo}
                name={"deliveryTo"}
                onChange={this.handleDeliveryNamesChange}
                ref={this.deliveryToInput}
                maxLength={this.deliveryToMaxLength}
              />
              <span
                className={
                  "text-danger" +
                  (this.state.showErrors ? " show-error " : " hide-error ")
                }
              >
                {this.deliveryToValidator(false)}
              </span>
            </div>
          </div>
          <div
            className={
              "form-custom-horizontal-group" +
              (contractData.contractType === 1 ? " hide " : "")
            }
          >
            <div className={"form-custom-label"}>
              <label>
                <FormattedMessage defaultMessage="De:" />
              </label>
            </div>
            <div className={"form-custom-input"}>
              <input
                type={"text"}
                placeholder={"Duvan"}
                value={contractData.deliveryFrom}
                name={"deliveryFrom"}
                onChange={this.handleDeliveryNamesChange}
                ref={this.deliveryFromInput}
                maxLength={this.deliveryFromMaxLength}
              />
              <span
                className={
                  "text-danger" +
                  (this.state.showErrors ? " show-error " : " hide-error ")
                }
              >
                {this.deliveryFromValidator(false)}
              </span>
            </div>
          </div>
          <div className={"mt-3"}>{""}</div>
          <OcassionsOptions
            contractType={this.state.contractData.contractType - 1}
            currentChoise={this.state.contractData.occasion}
            clicked={this.changeOccasionOption}
          />
          <div className={"form-custom-vertical-group"}>
            <label>
              <FormattedMessage
                defaultMessage="¿Qué quieres que diga {celebrityFullName}?"
                values={{
                  celebrityFullName: this.props.celebrityFullName
                }}
              />
            </label>
            <textarea
              rows={5}
              placeholder={
                contractData.contractType === 2
                  ? formatMessage(intlMessages.instructionsPlaceholderForOther)
                  : formatMessage(intlMessages.instructionsPlaceholderForMe)
              }
              value={contractData.instructions}
              name={"instructions"}
              onChange={this.handleInstructionsChange}
            />
            <div
              className={
                "text-left" +
                (contractData.instructions.length === 400
                  ? " text-danger "
                  : " text-muted ")
              }
            >
              <FormattedMessage
                defaultMessage="{instructionsLength}/400 caracteres permitidos"
                values={{
                  instructionsLength: contractData.instructions.length
                }}
              />
            </div>
            <span
              className={
                "text-danger" +
                (this.state.showErrors ? " show-error " : " hide-error ")
              }
            >
              {this.instructionsValidator()}
            </span>
          </div>
          <div className={"form-custom-vertical-group"}>
            <label>
              <FormattedMessage defaultMessage="Correo eléctronico de notificación" />
            </label>
            <input
              type={"email"}
              placeholder={formatMessage(
                intlMessages.deliveryContactPlaceholder
              )}
              value={contractData.deliveryContact}
              name={"deliveryContact"}
              onChange={this.handleInputChange}
            />
            <span
              className={
                "text-danger" +
                (this.state.showErrors ? " show-error " : " hide-error ")
              }
            >
              {this.deliveryContactValidator()}
            </span>
          </div>
          <div className={"form-custom-vertical-group"}>
            <label>
              <FormattedMessage defaultMessage="¿Quieres recibir el video a tu WhatsApp? (Opcional)" />
            </label>
            <PhoneInput
              enableLongNumbers={true}
              enableSearch
              searchClass="d-flex align-items-center p-2"
              searchPlaceholder={formatMessage(
                intlMessages.deliveryContactCellphone
              )}
              placeholder="+57 55555555"
              value={this.state.contractData.deliveryContactCellphone}
              className="form-control mb-3"
              containerClass="mb-3"
              country={this.state.deliveryContactCellphoneCountryCode}
              onChange={(cellphoneNumber, data) => {
                this.onCellphoneChange(cellphoneNumber, data.countryCode);
              }}
            />
            <span
              className={
                "text-danger" +
                (this.state.showErrors ? " show-error " : " hide-error ")
              }
            >
              {this.deliveryContactCellphoneValidator()}
            </span>
          </div>
          <div className={"mt-3"}>{""}</div>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={
              <FormattedMessage defaultMessage="Publicar este video en Famosos.com" />
            }
            checked={contractData.isPublic}
            onChange={this.handleIsPublic}
          />
          <div className={"mt-4"}>{""}</div>
          <div
            className={
              "text-danger text-center" +
              (this.props.saveClientContractError != null ? " mb-3 " : "")
            }
          >
            {this.props.saveClientContractError}
          </div>
          <button
            disabled={this.props.saveClientContractLoading}
            type={"button"}
            className={"btn f-contract-button text-align-center"}
            onClick={this.createContract}
          >
            <FormattedMessage defaultMessage="Continuar" />
          </button>
          <div className={"mt-3 mb-4 mx-auto text-center"}>
            <br />
            <img
              width="300px"
              src={
                secure_payment_img[
                  transformUserNavigatorLanguageToISO2Code(
                    this.props.router?.locale
                  )
                ]
              }
              alt={"pago-seguro"}
            />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

// Set propTypes
CreateContractForm.propTypes = {
  celebrityId: PropTypes.number,
  contractPrice: PropTypes.number,
  celebrityFullName: PropTypes.string,
  celebrityUsername: PropTypes.string,
  celebrityAvatar: PropTypes.string
};

// Set defaultProps
CreateContractForm.defaultProps = {
  celebrityId: null,
  celebrityFullName: null,
  contractPrice: 0,
  celebrityUsername: null,
  celebrityAvatar: null
};

// mapStateToProps
const mapStateToProps = ({ contracts, session }) => {
  return {
    sessionData: session.getSessionReducer.data,
    contractToPayExist: contracts.saveContractToPayReducer.completed,
    contractToPayData: contracts.saveContractToPayReducer.data,
    saveClientContractLoading: contracts.saveClientContractReducer.loading,
    saveClientContractError:
      contracts.saveClientContractReducer.error_data.error
  };
};

// mapStateToProps
const mapDispatchToProps = {
  getToken,
  saveClientContract: contractOperations.saveClientContract,
  updateClientContract: contractOperations.updateClientContract
};

// Export Class
const _CreateContractForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(CreateContractForm)));
export { _CreateContractForm as CreateContractForm };
