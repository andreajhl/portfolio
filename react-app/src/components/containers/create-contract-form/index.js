import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {Form} from "react-bootstrap";
import {PageContainer} from "../../layouts/page-container";

class CreateContractForm extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="CreateContractForm">
                <div className="container CreateContractPage" style={{zoom: "80%"}}>
                    <div className="row centerForm p-4">
                        <div className="col-12 col-md-8">
                            <div className="mb-4 titleMessage">
                                <small className="text-white">
                                    Video personalizado de {this.props.celebrity.fullName}
                                </small>
                            </div>

                            <Form>
                                {/*CONTRACT TYPE*/}
                                <Form.Group>
                                    <Form.Label>
                                        <b>¿Para quién es este video?</b>
                                    </Form.Label>
                                    <Form.Check type="radio">
                                        <Form.Check.Input
                                            type="radio"
                                            name="contractType"
                                            value={1}
                                            checked={this.state.contract_data.contractType === 1}
                                            onChange={this.handleValue}
                                        />
                                        <Form.Check.Label
                                            onClick={this.contractTypeLabelClick.bind(this, 1)}
                                        >
                                            Para un amigo o familiar
                                        </Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check type="radio">
                                        <Form.Check.Input
                                            type="radio"
                                            name="contractType"
                                            value={2}
                                            checked={this.state.contract_data.contractType === 2}
                                            onChange={this.handleValue}
                                        />
                                        <Form.Check.Label
                                            onClick={this.contractTypeLabelClick.bind(this, 2)}
                                        >
                                            Para mi
                                        </Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check type="radio">
                                        <Form.Check.Input
                                            type="radio"
                                            name="contractType"
                                            value={3}
                                            checked={this.state.contract_data.contractType === 3}
                                            onChange={this.handleValue}
                                        />
                                        <Form.Check.Label
                                            onClick={this.contractTypeLabelClick.bind(this, 3)}
                                        >
                                            Para mi marca o negocio <span className="new-label f-rounded">¡Nueva funcionalidad!</span>
                                        </Form.Check.Label>
                                    </Form.Check>
                                </Form.Group>
                                {/*END CONTRACT TYPE*/}

                                {/*FROM TO*/}
                                {this.renderFromTo()}
                                {/*END FROM TO*/}

                                {
                                    this.state.contract_data.contractType <= 2
                                        ?
                                        <>
                                            {/*INSTRUCTIONS*/}
                                            <Form.Group>
                                                <Form.Label>
                                                    <b>
                                                        Mis instrucciones para {this.props.celebrity.fullName}{" "}
                                                        son:
                                                    </b>
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="3"
                                                    placeholder={
                                                        this.state.contract_data.contractType === 1
                                                            ? "Ejemplo: Mi nombre es Duvan. ¡Mi hermana Anita es tu fan!. Ella está cumpliendo años el 12 de agosto y quisiera que le desearas un Feliz Cumpleaños de mi parte."
                                                            : "Escribe aquí tus instrucciones"
                                                    }
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
                                            <Form.Group>
                                                <Form.Label>
                                                    <b>Correo electrónico de notificación:</b>
                                                    <i className="fa fa-info-circle customTooltip ml-4">
                                                            <span className="tooltipText">
                                                                A este correo electrónico te noficaremos cuando el video esté listo.
                                                            </span>
                                                    </i>
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="correo@dominio.com"
                                                    name="deliveryContact"
                                                    value={this.state.contract_data.deliveryContact}
                                                    onChange={this.handleValue}
                                                />
                                                {this.showErrorMessage("deliveryContact")}
                                            </Form.Group>
                                            {/*END DELIVERY MAIL*/}

                                            {/* IS PUBLIC  */}
                                            <div className="mt-1">
                                                <Form.Check
                                                    checked={this.state.contract_data.isPublic}
                                                    onChange={this.handleIsPublic}
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Publicar este video en Famosos.com"
                                                />
                                            </div>
                                            {/* END IS PUBLIC */}

                                            <br/>

                                            <div className="text-center mx-auto" style={{maxWidth: "230px"}}>
                                                {this.state.errors.length ? (
                                                    <div className={"mb-2"}>
                                                        <small className="text-danger">
                                                            Tienes campos obligatorios por llenar
                                                        </small>
                                                    </div>
                                                ) : null}
                                                {this.props.saveClientContractError ? (
                                                    <div className={"mb-2"}>
                                                        <small className="text-danger">
                                                            Error
                                                        </small>
                                                    </div>
                                                ) : null}
                                                {this.state.tokenizeCardError ? (
                                                    <div className={"mb-2"}>
                                                        <small className="text-danger">
                                                            {this.state.tokenizeCardError}
                                                        </small>
                                                    </div>
                                                ) : null}
                                                {
                                                    this.props.isLoading
                                                        ?
                                                        <div className="mx-auto text-center text-dark">
                                                            Enviando...
                                                        </div>
                                                        :
                                                        <button
                                                            disabled={
                                                                this.props.isLoading || this.state.tokenizeCardLoading
                                                            }
                                                            type={"button"}
                                                            className={"btn f-contract-button text-align-center"}
                                                            onClick={this.createContract}
                                                        >
                                                            Continuar
                                                            <i className="fa fa-arrow-right"/>
                                                        </button>
                                                }

                                                <br/>
                                                <div className="mt-4 pt-2 mx-auto text-center" style={{width: "230px"}}>
                                                    <img width="100%" src={"/assets/img/pago-seguro-Famosos.png"}
                                                         alt={"pago-seguro"}/>
                                                </div>
                                                <br/>
                                                <br className={"d-block d-md-none"}/>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <img
                                                width="100%"
                                                src="/assets/img/famosos_licencia.png"
                                                alt="famosos_licencia"
                                            />
                                            <div className="text-center mx-auto" style={{maxWidth: "230px"}}>
                                                {/*<a href={"https://wa.me/17865207235?text=" + encodeURI("¡Hola! Estoy interesada/o en contratar a " + this.props.celebrity.fullName + " para que grabe un Video para promocionar mi empresa. ¿Me podrías explicar el proceso?")}*/}
                                                <button
                                                    className={"btn f-contract-button text-align-center"}
                                                    onClick={this.sendBusinessRequestGTMEvent}
                                                    type={"button"}
                                                >
                                                    Continuar
                                                    <i className="fa fa-arrow-right"/>
                                                </button>
                                            </div>
                                        </>
                                }
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

}

// Set propTypes
CreateContractForm.propTypes = {
    celebrityName: pro,
    celebrityName: "",
};

// Set defaultProps
CreateContractForm.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CreateContractForm = connect(mapStateToProps, mapDispatchToProps)(CreateContractForm);
export {_CreateContractForm as CreateContractForm};
