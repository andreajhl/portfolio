import React, {Component} from "react";
import "./styles.scss";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";
import {ContractPriceLayout} from "../../layouts/contract-price";

var moment = require("moment");

class ContractPendingPayPage extends Component {
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

    goToMyHirings() {
        history._pushRoute(PATHS.CLIENT_HIRINGS);
    }

    goToCreateAccount() {
        localStorage.setItem("redirectTo", PATHS.CLIENT_HIRINGS);
        if (this.props.contractCreated.token) {
            this.session.setSession(this.props.contractCreated.token);
            history._pushRoute(PATHS.CREATE_PASSWORD_PATH);
        } else {
            history._pushRoute(
                PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form") +
                "?use_email=true&email=" +
                this.props.resumen.contract.delivery_contact
            );
        }
    }

    goToCompleteProfile() {
        history._pushRoute(PATHS.COMPLETE_PROFILE_PATH);
    }

    goToHome() {
        history._pushRoute(PATHS.ROOT_PATH);
    }

    renderStripe() {
        const isLogged = this.session.getSession();
        const isDummy = this.session.getSession().client_status;

        return (
            <>
                <div className="ContractPendingPayPage container-fluid">
                    <div className="row justify-content-center f-container">
                        <div className="col-12 col-md-4 mx-auto text-center f-card">
                            <div className="w-100 mx-auto text-center logoFamosos">
                                <img
                                    width="170px"
                                    src="/assets/img/dark-famosos-logo.svg"
                                    alt="avatar"
                                />
                            </div>
                            <div className="rounded-circle">
                                <img
                                    className="rounded-circle"
                                    src={
                                        this.props.isLoading
                                            ? "/assets/img/avatar-blank.png"
                                            : this.props.resumen.contract.celebrity.avatar || ""
                                    }
                                    alt="avatar"
                                />
                            </div>
                            {this.props.resumen.contract.status === 10 ? (
                                <>
                                    <p className="mt-4 font-weight-bold">
                                        ¡Felicitaciones! tu pago ha sido exitoso.
                                    </p>
                                    <p className="textDescription">
                                        Le hemos enviado tu solicitud a {this.props.resumen.contract.celebrity.full_name},
                                        muy pronto recibirás tu Videomensaje personalizado para {this.props.resumen.contract.delivery_to}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-4 font-weight-bold">
                                        Tu solicitud para{" "}
                                        {this.props.resumen.contract.celebrity.full_name} ha sido
                                        creada.
                                    </p>
                                    <p className="textDescription">
                                        Estamos validando la transacción (este proceso puede tardar
                                        hasta 24 horas después de realizado el pago). Una vez que esté
                                        confirmado, tu Videomensaje llegará en breve.
                                    </p>
                                </>
                            )}
                            {!isLogged ? (
                                <>
                                    <p className="mt-4 font-weight-bold">
                                        Estás a un paso de crear tu cuenta
                                        <br/>
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.goToCreateAccount}
                                    >
                                        Crear una cuenta
                                        <i className="fa fa-arrow-right ml-2"/>
                                    </button>
                                    <div className="w-25 mx-auto m-4 text-center">
                                        <hr style={{border: "solid 0.5px"}}/>
                                    </div>
                                    <div className="mt-4" onClick={this.goToHome}>
                                        <small onClick={this.goToHome}>Volver a inicio</small>
                                    </div>
                                </>
                            ) : !isDummy ? (
                                <>
                                    <button
                                        className="btn btn-primary mt-3 mb-5 "
                                        onClick={this.goToCompleteProfile}
                                    >
                                        Completar perfil
                                        <i className="fa fa-arrow-right ml-2"/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary mb-4"
                                        onClick={this.goToMyHirings}
                                    >
                                        Ver mis contrataciones
                                        <i className="fa fa-arrow-right ml-2"/>
                                    </button>
                                </>
                            )}
                            <div className="w-100 mx-auto mb-4">
                                {this.props.resumen.payments.map((pay, index) => {
                                    return (
                                        <div key={index} className="card mb-3">
                                            <div
                                                className="card-header d-flex justify-content-between align-items-center">
                                                {pay.status === 10 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago creado</h5>
                                                        <i className="far fa-check-circle"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 20 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago cancelado</h5>
                                                        <i className="far fa-window-close"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 30 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago rechazado</h5>
                                                        <i className="fas fa-ban"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 40 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago pendiente</h5>
                                                        <i className="far fa-clock"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 50 ? (
                                                    <>
                                                        <h5 className="mb-0">Reembolso fallido</h5>
                                                        <i className="fas fa-ban"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 60 ? (
                                                    <>
                                                        <h5 className="mb-0">Cobro fallido</h5>
                                                        <i className="fas fa-ban"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 70 ? (
                                                    <>
                                                        <h5 className="mb-0">Reembolso exitoso</h5>
                                                        <i className="far fa-check-circle"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 80 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago expirado</h5>
                                                        <i className="far fa-clock"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 90 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago autorizado</h5>
                                                        <i className="far fa-check-circle"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                {pay.status === 100 ? (
                                                    <>
                                                        <h5 className="mb-0">Pago completado</h5>
                                                        <i className="far fa-check-circle"></i>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="card-body">
                                                <div></div>
                                                <div>
                                                    <p className="card-text text-muted text-left">
                                                        Fecha:{" "}
                                                        {moment(pay.transaction_datetime).format("L")}
                                                    </p>
                                                    <p className="card-text text-muted text-left">
                                                        Hora:{" "}
                                                        {moment(pay.transaction_datetime).format("LT")}
                                                    </p>
                                                </div>
                                                <div className="d-flex mt-2 justify-content-start align.items-center">
                                                    <img
                                                        className="text-left"
                                                        src={pay.gateway_payment_method.logo}
                                                        width="50px"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <p className="price mb-0">
                                                        <ContractPriceLayout classes={"text-black"}
                                                                             currency={pay.currency}
                                                                             price={pay.transaction_amount}/>
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
        console.log(this.props.resumen.payments);
        return <>{this.renderStripe()}</>;
    }
}

// Set defaultProps
ContractPendingPayPage.defaultProps = {
    resumen: {
        contract: {},
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
const _ContractPendingPayPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractPendingPayPage);
export {_ContractPendingPayPage as ContractPendingPayPage};
