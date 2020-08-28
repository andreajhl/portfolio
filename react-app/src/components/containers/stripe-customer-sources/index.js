import React, {Component} from 'react';
import "./styles.scss"
import {injectStripe} from "react-stripe-elements";
import {Session} from "../../../state/utils/session";
import {withRouter} from 'react-router-dom';
import {processStripePayment} from "../../../state/ducks/payments/actions";
import {Form} from "react-bootstrap";
import * as PATHS from "../../../routing/Paths";
import {history} from "../../../routing/History";

class StripeCustomerSources extends Component {

    constructor(props) {
        super(props);
        this.session = new Session();
        this.state = {
            selectedSourceId: null,
        };

    }

    retry = () => {
        return this.setState({
            ...this.state,
            disableButton: false,
            errorMessage: null
        });
    };

    renderError = () => {
        if (this.state.errorMessage) {
            return (
                <div className={"mx-auto p-4 error-container"}>
                    <div className="text-danger text-center mb-3">
                        <small className={"text-danger font-weight-bold"}>
                            {this.state.errorMessage}
                        </small>
                    </div>
                    <div className={"mx-auto text-center mb-3"}>
                        <button className={"btn btn-primary"} onClick={this.retry}>
                            Volver a intentar
                        </button>
                    </div>
                    <div className="mb-3 text-justify ">
                        <small>
                            Si el problema persiste puedes comunicarte con nuestro equipo de soporte a
                            {" "}
                            <a className={"font-weight-bold"}
                               href="mailto:experiencias@famosos.com">experiencias@famosos.com</a>
                            {" "}
                            para más información.
                        </small>
                    </div>
                </div>
            )
        }
    };

    updateSelectedSourceId = (e, source) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            selectedSourceId: source.sourceId
        })
    };

    applyStripeAuth = () => {

        if(this.state.selectedSourceId === null){
            this.setState({
                ...this.state,
                disableButton: false,
                errorMessage: "Debes seleccionar una tarjeta"
            });
        }else{
            this.setState({
                ...this.state,
                disableButton: true,
                errorMessage: null
            });
            processStripePayment(this.props.contractReference, this.state.selectedSourceId)
                .then(res => {
                    if (res.data.status === "ERROR") {
                        this.setState({
                            ...this.state,
                            errorMessage: res.data.error,
                        });
                    } else {
                        const route = PATHS.CONTRACT_CREATED.replace(
                            ":contract_reference",
                            res.data.data.reference
                        );
                        history._pushRoute(route);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.data) {
                            this.setState({
                                ...this.state,
                                errorMessage: error.response.data.error,
                            });
                        }
                    } else {
                        this.setState({
                            ...this.state,
                            errorMessage: "Ocurrió un error procesando tu pago,",
                        });
                    }
                });
        }
    };


    renderCards = () => {
        return (
            <div className={"sources-section"}>
                <div className={"mb-3"}>
                    <h6>Selecciona una tarjeta de crédito</h6>
                </div>
                {
                    this.props.availableSources.map((s, index) => {
                        return (
                            <div
                                className={"sources-option"}
                                key={"source-index-" + index}
                                onClick={(e) => this.updateSelectedSourceId(e, s)}
                            >
                                <div className={"source-brand"}>
                                    {s.typeData ? s.typeData.brand : ""}
                                </div>
                                <div className={"source-number"}>
                                    **** **** **** {s.typeData ? s.typeData.last4 : ""}
                                </div>
                                <div className={"handle-check"}>
                                    {
                                        this.state.selectedSourceId === s.sourceId
                                            ?
                                            <i className={"fa fa-check"}/>
                                            :
                                            <div/>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className={"text-center"}>
                    {
                        !this.state.errorMessage
                        &&
                        <div className={"mx-auto text-center"}>
                            <button
                                className={"btn btn-primary"}
                                onClick={this.applyStripeAuth}
                                disabled={this.state.disableButton}
                            >
                                Pagar
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className="StripeCustomerSources">
                {this.renderCards()}
                {this.renderError()}
            </div>
        );
    };
}


// defaultProps
StripeCustomerSources.defaultProps = {
    contractReference: "",
    availableSources: []
};
export default withRouter(injectStripe(StripeCustomerSources));
