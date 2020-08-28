import React, {Component} from "react";
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";
import * as GTM from "../../../state/utils/gtm";
import {connect} from "react-redux";
import {contractOperations} from "../../../state/ducks/contracts";

var moment = require("moment");

class ContractCreatedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.goToMyHirings = this.goToMyHirings.bind(this);
        this.goToCreateAccount = this.goToCreateAccount.bind(this);
        this.goToCompleteProfile = this.goToCompleteProfile.bind(this);

        this.session = new Session();
    }

    componentWillMount() {
        this.props.getContract(this.props.match.params.contract_reference);
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "CONTYRACT_PENDING_TO_PAY_PAGE_VIEW",
            this.props.match
        );
    }

    goToMyHirings() {
        history._pushRoute(PATHS.CLIENT_HIRINGS);
    }

    goToCreateAccount() {
        localStorage.setItem("finalRedirect", PATHS.CLIENT_HIRINGS);
        if (this.props.contractCreated.token) {
            this.session.setSession(this.props.contractCreated.token);
            history._pushRoute(PATHS.CREATE_PASSWORD_PATH);
        } else {
            history._pushRoute(
                PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form") +
                "?use_email=true&email=" +
                this.props.resumen.contract.deliveryContact
            );
        }
    }

    goToCompleteProfile() {
        history._pushRoute(PATHS.COMPLETE_PROFILE_PATH);
    }

    returnPaymentStatusLabel = (status) => {
        switch (status) {
            case 10:
                return ["Pago creado", "far fa-check-circle"];
            case 20:
                return ["Pago cancelado", "far fa-window-close"];
            case 30:
                return ["Pago rechazado", "fas fa-ban"];
            case 40:
                return ["Pago pendiente", "far fa-clock"];
            case 50:
                return ["Reembolso fallido", "fas fa-ban"];
            case 55:
                return ["Falló autorizacion de cobro", "fas fa-ban"];
            case 60:
                return ["Cobro fallido", "fas fa-ban"];
            case 70:
                return ["Reembolso exitoso", "far fa-check-circle"];
            case 80:
                return ["Pago expirado", "far fa-clock"];
            case 90:
                return ["Pago autorizado", "far fa-check-circle text-success"];
            case 100:
                return ["Pago completado", "far fa-check-circle text-success"];
            default:
                return ["", ""];
        }
    };

    renderStripe() {
        return (
            <>
                <div className="ContractCreatedPage container-fluid">
                    <div className="row justify-content-center f-container">
                        <div className="col-12 col-md-4 mx-auto text-center f-card">
                            <div className="w-100 mx-auto text-center logoFamosos">
                                <img
                                    width="170px"
                                    src={"/assets/img/dark-famosos-logo.svg"}
                                    alt="avatar"
                                />
                            </div>
                            <div className="rounded-circle">
                                <img className="rounded-circle"
                                     src={
                                         this.props.isLoading
                                             ? "/assets/img/avatar-blank.png"
                                             : this.props.resumen.celebrity.avatar || ""
                                     }
                                     alt="avatar"
                                />
                            </div>
                            <p className="mt-2 font-weight-bold">
                                <h5>¡Felicitaciones!</h5>
                            </p>
                            <p className="mt-2 p-3 font-weight-bold">
                                <h5> Se ha realizado con éxito la pre-autorización del cobro a tu cuenta.</h5>
                            </p>
                            <p className="mt-2 pl-3 pr-3 font-weight-light text-left">
                                <h6>Ten en cuenta:</h6>
                                <li>{this.props.resumen.celebrity.fullName} tiene un plazo
                                    de{" "}<b>7 días</b>{" "}para grabar tu video a partir de hoy.
                                </li>
                                <li>El <b>cobro se realizará</b> una vez que {this.props.resumen.celebrity.fullName} grabe tu
                                    video.
                                </li>
                                <li>Recibirás una notificación a <b>{this.props.resumen.contract.deliveryContact}</b> cuando tu video esté listo.</li>
                                <li> Si todo está bien con tu solicitud de acuerdo a nuestras políticas, muy pronto
                                    podrás
                                    disfrutar de tu videomensaje.
                                </li>
                            </p>
                            <button
                                className="btn btn-primary mb-4"
                                onClick={this.goToMyHirings}
                            >
                                Ver mis contrataciones
                            </button>
                            <div className="w-100 mx-auto mb-4">
                                {this.props.resumen.payments.map((pay, index) => {
                                    return (
                                        <div key={index} className="card mb-3">
                                            <div
                                                className={"card-header d-flex justify-content-between align-items-center"}>
                                                <>
                                                    <h5 className="mb-0">
                                                        {this.returnPaymentStatusLabel(pay.status)[0]}
                                                    </h5>
                                                    <i className={(this.returnPaymentStatusLabel(pay.status)[1])}/>
                                                </>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <p className="card-text text-muted text-left">
                                                        Fecha:{" "}
                                                        {moment(pay["createdAt"]).format("L")}
                                                    </p>
                                                    <p className="card-text text-muted text-left">
                                                        Hora:{" "}
                                                        {moment(pay["createdAt"]).format("LT")}
                                                    </p>
                                                    <p className="card-text text-muted text-left">
                                                        Transacción Reference:{" "}
                                                        {pay["transactionChargeId"]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return <>{this.renderStripe()}</>;
    }
}

// Set defaultProps
ContractCreatedPage.defaultProps = {
    resumen: {
        contract: {},
        celebrity: {},
        payments: []
    }
};

// mapStateToProps
const mapStateToProps = state => ({
    isLoading: state.contracts.getContractWithPaymentsReducer.loading,
    resumen: state.contracts.getContractWithPaymentsReducer.data,
    contractCreated: state.contracts.saveClientContractReducer.data
});
// mapStateToProps
const mapDispatchToProps = {
    getContract: contractOperations.getContractWithPayments
};

// Export Class
const _ContractCreatedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractCreatedPage);
export {_ContractCreatedPage as ContractCreatedPage};
