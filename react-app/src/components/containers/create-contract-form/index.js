import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';
import {contractOperations} from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import {Session} from "../../../state/utils/session";

class CreateContractForm extends Component {

    constructor(props) {
        super(props);
        const session = new Session();
        this.state = {
            contractData: {
                celebrity: null,
                contractType: 1,
                deliveryFrom: "",
                deliveryTo: session.hasEmail() ? (session.getSession().FullName || ""): "",
                deliveryType: 1,
                deliveryContact: session.hasEmail() ? (session.getSession().email || "") : "",
                instructions: "",
                isPublic: true
            },
            showErrors: false,
        };
        this.handleIsPublic = this.handleIsPublic.bind(this);
        this.createContract = this.createContract.bind(this);
    }

    sendBusinessRequestGTMEvent = () => {
        GTM.tagManagerDataLayer("BUSINESS_REQUEST", this.props.celebrity);
        // window.open("https://wa.me/573212493718?text=" + encodeURI("¡Hola! Estoy interesada/o en contratar a " + this.props.celebrity.fullName + " para que grabe un Video para promocionar mi empresa. ¿Me podrías explicar el proceso?"), "_blank")
        window.open("https://landing-business.famosos.com/form", "_blank")
    };

    createContract() {
        this.setState({
            ...this.state,
            showErrors: false,
        });
        if (this.deliveryFromValidator() ||
            this.deliveryToValidator() ||
            this.instructionsValidator() ||
            this.deliveryContactValidator()) {
            this.setState({
                ...this.state,
                showErrors: true,
            })
        } else {
            const contractData = this.state.contractData;
            contractData.celebrityId = this.props.celebrityId;
            GTM.tagManagerDataLayer("CONTRACT_CREATED", contractData);
            this.setState({contractData}, () => {
                this.props.saveClientContract(this.state.contractData);
            });
        }
    }

    handleInputChange = (event) => {
        const contractData = this.state.contractData;
        if (event.target.value.length <= 300) {
            contractData[event.target.name] = event.target.value;
            this.setState({
                contractData: contractData
            });
        }
    };

    handleContractTypeChange = (value) => {
        const contractData = this.state.contractData;
        contractData.contractType = parseInt(value);
        this.setState({
            ...this.state,
            contractData
        });
    };

    handleIsPublic() {
        const contractData = this.state.contractData;
        contractData.isPublic = !contractData.isPublic;
        this.setState({
            ...this.state,
            contractData: contractData
        });
    }


    deliveryFromValidator = () => {
        if (this.state.contractData.contractType === 2 && !this.state.contractData.deliveryFrom.length) {
            return "Campo requerido";
        }
        return null
    };

    deliveryToValidator = () => {
        if (!this.state.contractData.deliveryTo.length) {
            return "Campo requerido";
        }
        return null
    };

    instructionsValidator = () => {
        if (!this.state.contractData.instructions.length) {
            return "Campo requerido";
        }
        return null
    };

    deliveryContactValidator = () => {
        if (!this.state.contractData.deliveryContact.length) {
            return "Campo requerido";
        } else if (!this.state.contractData.deliveryContact.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            return "Este correo no es válido";
        }
        return null
    };


    render() {
        const contractData = this.state.contractData;
        return (
            <div className="CreateContractForm">

                <div className={"form-container"}>

                    {/* CELEBRITY DETAILS */}
                    <div className="celebrity-details">
                        <div className={"celebrity-avatar"}>
                            <img src={this.props.celebrityAvatar} alt={"avatar"}/>
                        </div>
                        <h5 className="celebrity-name">Video Personalizado de {this.props.celebrityFullName}</h5>
                    </div>


                    {/* DELIVERY TO OPTIONS */}
                    <div className="mt-3">
                        <h6 className="subtitle">¿Para quién es este video?</h6>
                        <div className={"delivery-option"}
                             onClick={(e) => {
                                 e.preventDefault();
                                 this.handleContractTypeChange(1)
                             }}>
                            <div className={"delivery-option-icon"}>
                                <i className="far fa-grin-stars"/>
                            </div>
                            <div className={"delivery-option-text"}>
                                <span>Para mi</span>
                            </div>
                            <div className="delivery-option-control">
                                <div
                                    className={"switch" + (contractData.contractType === 1 ? " on " : " off ")}
                                >
                                    <span className={"active"}/>
                                </div>
                            </div>
                        </div>
                        <div className={"delivery-option"}
                             onClick={(e) => {
                                 e.preventDefault();
                                 this.handleContractTypeChange(2)
                             }}>
                            <div className={"delivery-option-icon"}>
                                <i className="fas fa-gift"/>
                            </div>
                            <div className={"delivery-option-text"}>
                                <span>Para un amigo o familiar</span>
                            </div>
                            <div className="delivery-option-control">
                                <div
                                    className={"switch" + (contractData.contractType === 2 ? " on " : " off ")}
                                >
                                    <span className={"active"}/>
                                </div>
                            </div>
                        </div>
                        <div className="business-option">
                            Si quieres un video comercial para tu marca haz click
                            {" "}
                            <span className={"text-primary"} onClick={this.sendBusinessRequestGTMEvent}>aquí.</span>
                        </div>
                    </div>
                    <br/>
                    {/* FORM INPUTS */}
                    <div className={"form-custom-horizontal-group"}>
                        <div className={"form-custom-label"}>
                            <label>Para:</label>
                        </div>
                        <div className={"form-custom-input"}>
                            <input
                                type={"text"}
                                placeholder={"Ana"}
                                value={contractData.deliveryTo}
                                name={"deliveryTo"}
                                onChange={this.handleInputChange}
                            />
                            <span
                                className={"text-danger" + (this.state.showErrors ? " show-error " : " hide-error ")}>
                                {this.deliveryToValidator()}
                            </span>
                        </div>
                    </div>
                    <div
                        className={"form-custom-horizontal-group" + (contractData.contractType === 1 ? " hide " : "")}>
                        <div className={"form-custom-label"}>
                            <label>De:</label>
                        </div>
                        <div className={"form-custom-input"}>
                            <input
                                type={"text"}
                                placeholder={"Duvan"}
                                value={contractData.deliveryFrom}
                                name={"deliveryFrom"}
                                onChange={this.handleInputChange}
                            />
                            <span
                                className={"text-danger" + (this.state.showErrors ? " show-error " : " hide-error ")}>
                                {this.deliveryFromValidator()}
                            </span>
                        </div>
                    </div>
                    <div className={"mt-3"}>{""}</div>
                    <div className={"form-custom-vertical-group"}>
                        <label>¿Qué quieres que diga {this.props.celebrityFullName}?</label>
                        <textarea
                            rows={5}
                            placeholder={
                                contractData.contractType === 2
                                    ? "Ejemplo: Mi amiga Ana cumple años el 12 de agosto, me gustaría que la felicitaras."
                                    : "Mis instrucciones son"
                            }
                            value={contractData.instructions}
                            name={"instructions"}
                            onChange={this.handleInputChange}
                        />
                        <div
                            className={"text-left" + (contractData.instructions.length === 300 ? " text-danger " : " text-muted ")}>
                            {contractData.instructions.length}/300 caracteres permitidos
                        </div>
                        <span
                            className={"text-danger" + (this.state.showErrors ? " show-error " : " hide-error ")}>
                            {this.instructionsValidator()}
                        </span>
                    </div>
                    <div className={"form-custom-vertical-group"}>
                        <label>Correo eléctronico de notificación</label>
                        <input
                            type={"email"}
                            placeholder={"correo@dominio.com"}
                            value={contractData.deliveryContact}
                            name={"deliveryContact"}
                            onChange={this.handleInputChange}
                        />
                        <span
                            className={"text-danger" + (this.state.showErrors ? " show-error " : " hide-error ")}>
                            {this.deliveryContactValidator()}
                        </span>
                    </div>
                    <div className={"mt-3"}>{""}</div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Publicar este video en Famosos.com"
                        checked={contractData.isPublic}
                        onChange={this.handleIsPublic}
                    />
                    <div className={"mt-4"}>{""}</div>
                    <div
                        className={"text-danger text-center" + (this.props.saveClientContractError != null ? " mb-3 " : "")}>
                        {this.props.saveClientContractError}
                    </div>
                    <button
                        disabled={this.props.saveClientContractLoading}
                        type={"button"}
                        className={"btn f-contract-button text-align-center"}
                        onClick={this.createContract}
                    >
                        Continuar
                    </button>
                    <div className={"mt-3 mb-4 mx-auto text-center"}>
                        <br/>
                        <img
                            width="300px"
                            src={"/assets/img/pago-seguro.png"}
                            alt={"pago-seguro"}
                        />
                        <br/>
                    </div>
                </div>
            </div>
        );
    };

}

// Set propTypes
CreateContractForm.propTypes = {
    celebrityId: PropTypes.number,
    celebrityFullName: PropTypes.string,
    celebrityUsername: PropTypes.string,
    celebrityAvatar: PropTypes.string,
};

// Set defaultProps
CreateContractForm.defaultProps = {
    celebrityId: null,
    celebrityFullName: null,
    celebrityUsername: null,
    celebrityAvatar: null,
};

// mapStateToProps
const mapStateToProps = (state) => ({
    saveClientContractLoading: state.contracts.saveClientContractReducer.loading,
    saveClientContractError: state.contracts.saveClientContractReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
    saveClientContract: contractOperations.saveClientContract
};

// Export Class
const _CreateContractForm = connect(mapStateToProps, mapDispatchToProps)(CreateContractForm);
export {_CreateContractForm as CreateContractForm};
