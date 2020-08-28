import React, {Component} from 'react';
import "./styles.scss"
import {withRouter} from "react-router";
import {loadStripe} from "@stripe/stripe-js";
import {processStripePayment} from "../../../state/ducks/payments/actions";
import * as PATHS from "../../../routing/Paths";


class Stripe3dSecureResponse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source: "",
            intentsCount: 0,
            error: null,
        }
    }

    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.getSource();
        setTimeout(() => {
            if (!this.state.error) {
                this.setState({
                    error: "Se excedió el tiempo de espera."
                });
            }
        }, 25000);
    }

    getSource = async () => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.retrieveSource({
            id: this.props.sourceId,
            client_secret: this.props.clientSecret
        }).then(this.get3DSourceCallback);
    };

    get3DSourceCallback = (result) => {
        const MAX_POLL_COUNT = 10;
        if (result.source) {
            // CHECK SOURCE STATUS
            // The status of the source, one of canceled, chargeable, consumed, failed, or pending.
            // Only chargeable sources can be used to create a charge.
            let source = result.source;

            if (source.status === 'chargeable') {
                // LINK SOURCE WITH THE CUSTOMER AND SEND TO THE BACKEND TO APPLY AUTHORIZATION
                this.sendStripePayemtData(source.id);

            } else if (source.status === 'pending' && this.state.intentsCount < MAX_POLL_COUNT) {
                // TRY AGAIN
                this.setState({
                    ...this.state,
                    intentsCount: 1,
                })
            } else {
                // ERROR
                this.setState({
                    error: "Card source status: " + source.status
                });
            }
        } else {
            // ERROR
            this.setState({
                error: "This card source does not exist"
            });
        }
    };

    sendStripePayemtData = (sourceId) => {
        processStripePayment(this.props.contractReference, sourceId)
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
                    window.parent.postMessage("CONTRACT_CREATED" + route, '*');
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
    };

    goToPaymentMethods = () => {
        window.parent.postMessage('GO_TO_PAYMENT_METHODS', '*');
    };

    render() {
        return (
            <div className="Stripe3dSecureResponse">
                <div className="section">
                    {
                        !this.state.errorMessage
                            ?
                            <div className={"text-center p-4 mx-auto my-auto"}>
                                <h4 className="font-weight-bold text-center">Procesando...</h4>
                                <hr/>
                                <h6 className={"mb-4"}>
                                    Mantenga esta ventana abierta mientras se válida su información
                                </h6>
                            </div>
                            :
                            <div className={"mx-auto p-4"}>
                                <div className={"mx-auto text-center mb-4"}>
                                    <i className="ml-2 fa fa-credit-card" style={{fontSize: "130px"}}/>
                                </div>
                                <div className={"mx-auto text-center mt-3 mb-3"}>
                                    <h5 className={"font-weight-bold"}>
                                        No se pudo autenticar esta tarjeta correctamente
                                    </h5>
                                </div>
                                <div className="text-danger text-center mb-3">
                                    <small className={"text-danger font-weight-bold"}>
                                        {this.state.errorMessage}
                                    </small>
                                </div>
                                <div className={"mx-auto text-center mb-3"}>
                                    <button className={"btn btn-primary"} onClick={(e) => {
                                        e.preventDefault();
                                        this.goToPaymentMethods()
                                    }}>
                                        Volver a métodos de pago
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
                    }

                </div>
            </div>
        );
    };
}


// defaultProps
Stripe3dSecureResponse.defaultProps = {
    contractReference: "",
    clientSecret: "",
    sourceId: "",
};

// Export class
export default withRouter(Stripe3dSecureResponse);
