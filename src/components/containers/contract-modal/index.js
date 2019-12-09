import React, {Component} from "react";
import {Col, Form, Modal, Row} from "react-bootstrap";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";

class ContractModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contract_data: {
                celebrity: this.props.celebrity.id,
                contract_type: 1,
                delivery_from: "",
                delivery_to: "",
                delivery_type: 1,
                delivery_contact: "",
                instructions: "",
                price: this.props.celebrity.contracts_price,
                is_public: true,
            },
            errors: [],
            tokenizeCardLoading: false,
            tokenizeCardError: null,
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.handleIsPublic = this.handleIsPublic.bind(this);
        this.createContract = this.createContract.bind(this);

        this.childRef = React.createRef();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.isLoading === false && this.props.isLoading === true) {
            this.setState({
                tokenizeCardLoading: false
            })
        }
    }

    handleCloseModal() {
        this.props.onHide()
    }

    handleValue(event) {
        const contract_data = this.state.contract_data;
        if (event.target.name === "contract_type") {
            contract_data[event.target.name] = parseInt(event.target.value);
        } else {
            contract_data[event.target.name] = event.target.value;
        }
        this.setState({
            contract_data: contract_data
        })
    }

    contractTypeLabelClick(value){
        const contract_data = this.state.contract_data;
        contract_data["contract_type"] = value;
        this.setState({
            contract_data: contract_data
        })
    }

    handleIsPublic() {
        const contract_data = this.state.contract_data;
        contract_data.is_public = !contract_data.is_public;
        this.setState({
            contract_data: contract_data
        })
    }

    createContract() {
        if (!this.props.isLoading || !this.state.tokenizeCardLoading) {
            const contract_data = this.state.contract_data;

            contract_data.celebrity_id = this.props.celebrity.id; // Celebrity ID

            const errors = [];
            if (contract_data.contract_type === 1 && !contract_data.delivery_from) {
                errors.push("delivery_from");
            }
            if (!contract_data.delivery_to) {
                errors.push("delivery_to");
            }
            if (!contract_data.delivery_contact) {
                errors.push("delivery_contact");
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
                this.setState({tokenizeCardLoading: true, tokenizeCardError: null}, async () => {
                    this.setState({contract_data}, () => {
                        this.props.saveClientContract(this.state.contract_data);
                    })
                });
            }
        }
    }

    showErrorMessage(field) {
        if (field === "instructions_300") {
            return (
                <>
                    {
                        this.state.errors.includes(field)
                        &&
                        <Form.Text className="text-danger">El campo contiene mas de 300 caracteres</Form.Text>
                    }
                </>
            )
        } else {
            return (
                <>
                    {
                        this.state.errors.includes(field)
                        &&
                        <Form.Text className="text-danger">Campo obligatorio</Form.Text>
                    }
                </>
            )
        }
    }

    renderFromTo() {
        switch (this.state.contract_data.contract_type) {
            default:
            case 1:
                return (
                    <Row>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label><b>Para:</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Anita"
                                    name="delivery_to"
                                    value={this.state.contract_data.delivery_to}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("delivery_to")}
                            </Form.Group>
                        </Col>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label><b>De:</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Duvan"
                                    name="delivery_from"
                                    value={this.state.contract_data.delivery_from}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("delivery_from")}
                            </Form.Group>
                        </Col>
                    </Row>
                );
            case 2:
                return (
                    <Row>
                        <Col sm="4">
                            <Form.Group>
                                <Form.Label><b>Mi nombre es:</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Duvan"
                                    name="delivery_to"
                                    value={this.state.contract_data.delivery_to}
                                    onChange={this.handleValue}
                                />
                                {this.showErrorMessage("delivery_to")}
                            </Form.Group>
                        </Col>
                    </Row>
                );
        }
    }


    render() {
        return (
            <div className="ContractModal">
                <Modal size="lg" show={this.props.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header>
                        <small className="text-white">Contrata a {this.props.celebrity.full_name} para que grabe tu video mensaje!</small>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            {/*CONTRACT TYPE*/}
                            <Form.Group>
                                <Form.Label><b>¿Para quién es este video?</b></Form.Label>
                                <Form.Check type="radio">
                                    <Form.Check.Input
                                        type="radio"
                                        name="contract_type"
                                        value={1}
                                        checked={this.state.contract_data.contract_type === 1}
                                        onChange={this.handleValue}
                                    />
                                    <Form.Check.Label onClick={this.contractTypeLabelClick.bind(this, 1)}>
                                        Para un amigo o familiar
                                    </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type="radio">
                                    <Form.Check.Input
                                        type="radio"
                                        name="contract_type"
                                        value={2}
                                        checked={this.state.contract_data.contract_type === 2}
                                        onChange={this.handleValue}
                                    />
                                    <Form.Check.Label onClick={this.contractTypeLabelClick.bind(this, 2)}>
                                        Para mi
                                    </Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                            {/*END CONTRACT TYPE*/}

                            {/*FROM TO*/}
                            {this.renderFromTo()}
                            {/*END FROM TO*/}

                            {/*INSTRUCTIONS*/}
                            <Form.Group>
                                <Form.Label>
                                    <b>
                                        Mis instrucciones para {this.props.celebrity.full_name} son:
                                    </b>
                                </Form.Label>
                                <Form.Control as="textarea"
                                              rows="3"
                                              placeholder={this.state.contract_data.contract_type === 1 ? "Ejemplo: Mi nombre es Duvan. ¡Mi hermana Anita es tu fan!. Ella está cumpliendo años el 12 de agosto y quisiera que le desearas un Feliz Cumpleaños de mi parte." : "Escribe aquí tus instrucciones"}
                                              name="instructions"
                                              value={this.state.contract_data.instructions}
                                              onChange={this.handleValue}
                                />
                                <Form.Text className="text-muted">
                                    Máximo 300 caracteres
                                </Form.Text>
                                {this.showErrorMessage("instructions")}
                                {this.showErrorMessage("instructions_300")}
                            </Form.Group>
                            {/*END INSTRUCTIONS*/}

                            {/*DELIVERY MAIL*/}
                            <Row>
                                <Col sm="6">
                                    <Form.Group>
                                        <Form.Label><b>Correo electrónico de entrega:</b></Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="correo@dominio.com"
                                            name="delivery_contact"
                                            value={this.state.contract_data.delivery_contact}
                                            onChange={this.handleValue}
                                        />
                                        {this.showErrorMessage("delivery_contact")}
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/*END DELIVERY MAIL*/}

                            {/* IS PUBLIC  */}
                            <div className="mt-1">
                                <Form.Check
                                    checked={this.state.contract_data.is_public}
                                    onChange={this.handleIsPublic}
                                    type="switch"
                                    id="custom-switch"
                                    label="Publicar este video en Famosos.com"
                                />
                            </div>
                            {/* END IS PUBLIC */}
                        </Form>
                        <hr/>
                        <div className="text-center">
                            {
                                this.state.errors.length ?
                                    <div className={"mb-2"}>
                                        <small className="text-danger">
                                            Tienes campos obligatorios por llenar
                                        </small>
                                    </div>
                                    : null
                            }
                            {
                                this.props.saveClientContractError
                                    ?
                                    <div className={"mb-2"}>
                                        <small className="text-danger">
                                            El pago no pudo ser procesado, contáctanos a experiencias@famosos.com.
                                        </small>
                                    </div>
                                    : null
                            }
                            {
                                this.state.tokenizeCardError
                                    ?
                                    <div className={"mb-2"}>
                                        <small className="text-danger">
                                            {this.state.tokenizeCardError}
                                        </small>
                                    </div>
                                    : null
                            }
                            <button
                                disabled={(this.props.isLoading || this.state.tokenizeCardLoading)}
                                className="contract-button hover cursor-pointer p-2 border bg-active"
                                onClick={this.createContract}
                            >
                                {
                                    this.props.isLoading || this.state.tokenizeCardLoading
                                        ?
                                        <span className="spinner-grow spinner-grow-sm"
                                              role="status"
                                              aria-hidden="true"
                                        />
                                        :
                                        <span className="text-white">
                                           CONTRATAR AHORA
                                        </span>
                                }
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

// Set defaultProps
ContractModal.defaultProps = {
    showModal: false,
    onHide: () => {
    },
    celebrity: {},
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.saveClientContractReducer.loading,
    saveClientContractError: state.contracts.saveClientContractReducer.error_data.error,
});

// mapStateToProps
const mapDispatchToProps = {
    saveClientContract: contractOperations.saveClientContract,
};

// Export Class
const _ContractModal = connect(mapStateToProps, mapDispatchToProps)(ContractModal);
export {_ContractModal as ContractModal};
