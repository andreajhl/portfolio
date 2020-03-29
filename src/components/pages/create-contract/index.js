import React, {Component} from "react";
import "./styles.scss";
import {connect} from "react-redux";
import {PageContainer} from "../../layouts";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {Col, Form, Row} from "react-bootstrap";
import * as GTM from "../../../state/utils/gtm";
import {contractOperations} from "../../../state/ducks/contracts";

class CreateContractPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contract_data: {
        celebrity: this.props.celebrity.id,
        contractType: 1,
        deliveryFrom: "",
        deliveryTo: "",
        deliveryType: 1,
        deliveryContact: "",
        instructions: "",
        price: this.props.celebrity.contracts_price,
        isPublic: true
      },
      errors: []
    };
    this.handleValue = this.handleValue.bind(this);
    this.handleIsPublic = this.handleIsPublic.bind(this);
    this.createContract = this.createContract.bind(this);

    this.childRef = React.createRef();
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

  createContract() {
    if (!this.props.isLoading || !this.state.tokenizeCardLoading) {
      const contract_data = this.state.contract_data;

      contract_data.celebrityId = this.props.celebrity.id; // Celebrity ID
      contract_data.price = this.props.celebrity.video_message_price; // Price

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
        GTM.tagManagerDataLayer("CONTRACT_SAVED", contract_data);
        this.setState({contract_data}, () => {
          this.props.saveClientContract(this.state.contract_data);
        });
      }
    }
  }

  componentWillMount() {
    if (this.props.match.params.celebrity_username) {
      this.props.getCelebrity(this.props.match.params.celebrity_username);
    }
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

  renderFromTo() {
    switch (this.state.contract_data.contractType) {
      default:
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
    }
  }

  render() {
    return (
        <>
          <PageContainer
              showFooter={false}
              showLogin={false}
              showInputSearchSm={false}
              showSearchWeb={false}
              applyFetchCelebrities={false}
          >
            <div className="container CreateContractPage" style={{zoom: "80%"}}>
              <div className="row centerForm p-4">
                <div className="col-12 col-md-8">
                  <div className="mb-4 titleMessage">
                    <small className="text-white">
                      Video personalizado de {this.props.celebrity.full_name}
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
                    </Form.Group>
                    {/*END CONTRACT TYPE*/}

                    {/*FROM TO*/}
                    {this.renderFromTo()}
                    {/*END FROM TO*/}

                    {/*INSTRUCTIONS*/}
                    <Form.Group>
                      <Form.Label>
                        <b>
                          Mis instrucciones para {this.props.celebrity.full_name}{" "}
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
                  </Form>
                  <br/>
                  <div className="text-center">
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
                    <button
                        disabled={
                          this.props.isLoading || this.state.tokenizeCardLoading
                        }
                        className="contract-button hover cursor-pointer p-2 border bg-active"
                        onClick={this.createContract}
                    >
                      {this.props.isLoading || this.state.tokenizeCardLoading ? (
                          <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                          />
                      ) : (
                          <span className="text-white">
                        Continuar
                        <i
                            className="fa fa-arrow-right float-right text-white ml-2"
                            style={{fontSize: "26px", position: "absolute"}}
                        />
                      </span>
                      )}
                    </button>
                    <br/>
                    <div className="mt-4 mx-auto text-center">
                      <img width="230px" src={"/assets/img/pago-seguro.png"} alt={"pago-seguro"}/>
                    </div>
                    <br/>
                    <br className={"d-block d-md-none"}/>
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </>
    );
  }
}

// Set defaultProps
CreateContractPage.defaultProps = {
  contract: {celebrity: {}}
};

// mapStateToProps
const mapStateToProps = state => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data,
  saveClientContractError:
  state.contracts.saveClientContractReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get,
  saveClientContract: contractOperations.saveClientContract
};

// Export Class
const _CreateContractPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateContractPage);
export {_CreateContractPage as CreateContractPage};
