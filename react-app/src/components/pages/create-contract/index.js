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
                price: 0,
                isPublic: true
            },
            errors: []
        };
        this.handleValue = this.handleValue.bind(this);
        this.handleIsPublic = this.handleIsPublic.bind(this);
        this.createContract = this.createContract.bind(this);

        this.childRef = React.createRef();
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "CREATE_CONTRACT_PAGE_VIEW",
            this.props.match
        );
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

            contract_data.celebrityId = this.props.celebrity.id;
            const res = this.props.celebrity.contractTypes.find(x => x.contractType === 1);
            if (res) {
                contract_data.price = res.price;
            }

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

    sendBusinessRequestGTMEvent = () => {
        GTM.tagManagerDataLayer("BUSINESS_REQUEST", this.props.celebrity);
        // window.open("https://wa.me/573212493718?text=" + encodeURI("¡Hola! Estoy interesada/o en contratar a " + this.props.celebrity.fullName + " para que grabe un Video para promocionar mi empresa. ¿Me podrías explicar el proceso?"), "_blank")
        window.open("https://landing-business.famosos.com/form", "_blank")
    };

    render() {
        return (
            <>
                <PageContainer
                    showFooter={false}
                    showLogin={false}
                    showInputSearchSm={false}
                    showSearchWeb={false}
                    fetchCelebrities={false}
                >

                </PageContainer>
                {/* STEPS COMMUNICATION */}
                <div className="d-none d-md-block">
                    <img width="100%" src="/assets/img/steps_desktop_hire.svg"/>
                </div>
                <div className="d-block d-md-none">
                    <img width="100%" src="/assets/img/steps_mobile_hire.svg"/>
                </div>
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
