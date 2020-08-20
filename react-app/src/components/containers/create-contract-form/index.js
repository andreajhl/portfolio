import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {Col, Form, Row} from "react-bootstrap";
import PropTypes from 'prop-types';
import {contractOperations} from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";

class CreateContractForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contract_data: {
                celebrity: null,
                contractType: 1,
                deliveryFrom: "",
                deliveryTo: "",
                deliveryType: 1,
                deliveryContact: "",
                instructions: "",
                price: 0,
                isPublic: true
            },
            errors: []
        };
        this.handleValue = this.handleValue.bind(this);
        this.handleIsPublic = this.handleIsPublic.bind(this);
        this.createContract = this.createContract.bind(this);
    }

    showErrorMessage(field) {
        if (field === "instructions_300") {
            return (
                <>
                    {this.state.errors.includes(field) && (
                        <Form.Text className="text-danger">
                            El campo contiene mas de 300 caracteres
                        </Form.Text>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {this.state.errors.includes(field) && (
                        <Form.Text className="text-danger">Campo obligatorio</Form.Text>
                    )}
                </>
            );
        }
    }


    sendBusinessRequestGTMEvent = () => {
        GTM.tagManagerDataLayer("BUSINESS_REQUEST", this.props.celebrity);
        // window.open("https://wa.me/573212493718?text=" + encodeURI("¡Hola! Estoy interesada/o en contratar a " + this.props.celebrity.fullName + " para que grabe un Video para promocionar mi empresa. ¿Me podrías explicar el proceso?"), "_blank")
        window.open("https://landing-business.famosos.com/form", "_blank")
    };

    renderFromTo() {
        switch (this.state.contract_data.contractType) {
            case 1:
                return (
                    <Row>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label>
                                    <b>Para:</b>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Anita"
                                    name="deliveryTo"
                                    value={this.state.contract_data.deliveryTo}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("deliveryTo")}
                            </Form.Group>
                        </Col>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label>
                                    <b>De:</b>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Duvan"
                                    name="deliveryFrom"
                                    value={this.state.contract_data.deliveryFrom}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("deliveryFrom")}
                            </Form.Group>
                        </Col>
                    </Row>
                );
            case 2:
                return (
                    <Row>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label>
                                    <b>Mi nombre es:</b>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Duvan"
                                    name="deliveryTo"
                                    value={this.state.contract_data.deliveryTo}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("deliveryTo")}
                            </Form.Group>
                        </Col>
                    </Row>
                );
            default:
                return
        }
    }


    createContract() {
        if (!this.props.isLoading || !this.state.tokenizeCardLoading) {
            const contract_data = this.state.contract_data;

            contract_data.celebrityId = this.props.celebrityId;

            const errors = [];
            if (contract_data.contractType === 1 && !contract_data.deliveryFrom) {
                errors.push("deliveryFrom");
            }
            if (!contract_data.deliveryTo) {
                errors.push("deliveryTo");
            }
            if (!contract_data.deliveryContact || !contract_data.deliveryContact.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                errors.push("deliveryContact");
            }
            if (!contract_data.instructions) {
                errors.push("instructions");
            }
            if (contract_data.instructions.length > 300) {
                errors.push("instructions_300");
            }
            this.setState({errors});
            if (errors.length) {
                return false;
            } else {
                GTM.tagManagerDataLayer("CONTRACT_CREATED", contract_data);
                this.setState({contract_data}, () => {
                    this.props.saveClientContract(this.state.contract_data);
                });
            }
        }
    }

    handleValue(event) {
        const contract_data = this.state.contract_data;
        if (event.target.name === "contractType") {
            contract_data[event.target.name] = parseInt(event.target.value);
        } else {
            contract_data[event.target.name] = event.target.value;
        }
        this.setState({
            contract_data: contract_data
        });
    }

    contractTypeLabelClick(value) {
        const contract_data = this.state.contract_data;
        contract_data["contractType"] = value;
        this.setState({
            contract_data: contract_data
        });
    }

    handleIsPublic() {
        const contract_data = this.state.contract_data;
        contract_data.isPublic = !contract_data.isPublic;
        this.setState({
            contract_data: contract_data
        });
    }

    render() {
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
                        <div className={"delivery-option"}>
                            <div className={"delivery-option-icon"}>
                                <i className="far fa-grin-stars"/>
                            </div>
                            <div className={"delivery-option-text"}>
                                <span>Para mi</span>
                            </div>
                            <div className="delivery-option-control">
                                <div className={"switch off"}>
                                    <span className="active"/>
                                </div>
                            </div>
                        </div>
                        <div className={"delivery-option"}>
                            <div className={"delivery-option-icon"}>
                                <i className="fas fa-gift"/>
                            </div>
                            <div className={"delivery-option-text"}>
                                <span>Para un amigo o familiar</span>
                            </div>
                            <div className="delivery-option-control">
                                <div className={"switch on"}>
                                    <span className="active"/>
                                </div>
                            </div>
                        </div>
                        <span className="business-option">
                        Si quieres un video comercial para tu marca haz clic
                            {" "}
                            <span className={"text-primary"} onClick={this.sendBusinessRequestGTMEvent}>aquí.</span>
                    </span>
                    </div>

                    <br/>

                    {/* FORM INPUTS */}
                    <div className={"form-custom-horizontal-group"}>
                        <div className={"form-custom-label"}>
                            <label>De:</label>
                        </div>
                        <div className={"form-custom-input"}>
                            <input
                                type={"text"}
                                placeholder={"Duvan"}
                            />
                        </div>
                    </div>
                    <div className={"form-custom-horizontal-group"}>
                        <div className={"form-custom-label"}>
                            <label>Para:</label>
                        </div>
                        <div className={"form-custom-input"}>
                            <input
                                type={"text"}
                                placeholder={"Ana"}
                            />
                        </div>
                    </div>
                    <div className={"mt-3"}>{""}</div>
                    <div className={"form-custom-vertical-group"}>
                        <label>¿Qué quieres que diga Alan Tacher?</label>
                        <textarea
                            type={"text"}
                            rows={5}
                            placeholder={"Ejemplo: Mi amiga Ana cumple años el 12 de agosto, me gustaría que la felicitaras."}
                        />
                    </div>
                    <div className={"form-custom-vertical-group"}>
                        <label>Correo eléctronico de entrega</label>
                        <input
                            type={"email"}
                            placeholder={"correo@dominio.com"}
                        />
                    </div>
                    <div className={"mt-2"}>{""}</div>
                    <Form.Check
                        checked={this.state.contract_data.isPublic}
                        onChange={this.handleIsPublic}
                        type="switch"
                        id="custom-switch"
                        label="Publicar este video en Famosos.com"
                    />
                    <div className={"mt-4"}>{""}</div>
                    <button
                        disabled={
                            this.props.isLoading || this.state.tokenizeCardLoading
                        }
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
    saveClientContractError: state.contracts.saveClientContractReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
    saveClientContract: contractOperations.saveClientContract
};

// Export Class
const _CreateContractForm = connect(mapStateToProps, mapDispatchToProps)(CreateContractForm);
export {_CreateContractForm as CreateContractForm};
