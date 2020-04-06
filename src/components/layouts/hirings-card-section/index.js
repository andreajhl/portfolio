import React, {Component} from 'react';
import "./styles.scss";
import * as PATHS from "../../../routing/Paths";
import {history} from "../../../routing/History";


class HiringsCardSectionLayout extends Component {

    constructor(props){
        super(props);
    }

    goToContract(contract_reference) {
        history._pushRoute(PATHS.HIRING_PREVIEW.replace(":contract_reference", "") + contract_reference)
    }

    goToHome(){
        history._pushRoute(PATHS.ROOT_PATH)
    }

    goToPay(contract_reference){
        history._pushRoute(PATHS.PAYMENT_METHODS.replace(":contract_reference", contract_reference))
    }

    returnButton(contract) {

        // CONTRACT_CREATED = 5
        // CONTRACT_PENDING_TO_PAY = 6
        // CONTRACT_PAYED_BY_CLIENT = 10
        // CONTRACT_REJECTED = 20
        // CONTRACT_RECORDED = 30
        // CONTRACT_COMPLETED = 40

        if (contract.status === 5) {
            return (
                <button className="btn btn-outline-secondary" style={{width: "110px"}} onClick={this.goToPay.bind(this, contract.reference)}>
                    <span className="d-md-block text-secondary">Continuar</span>
                    <i className="fa fa-arrow-right text-secondary"/>
                </button>
            )
        } else if (contract.status === 6) {
            return (
                <button className="btn btn-outline-dark" disabled style={{width: "170px"}} onClick={this.goToContract.bind(this, contract.reference)}>
                    <span className="d-md-block text-dark">Validando el pago</span>
                    <i className="fa fa-clock"/>
                </button>
            )
        } else if (contract.status === 10) {
            return (
                <button className="btn btn-outline-dark" disabled style={{width: "220px"}} onClick={this.goToContract.bind(this, contract.reference)}>
                    <span className="d-md-block text-dark">En espera de grabación</span>
                    <i className="fa fa-clock"/>
                </button>
            )
        } else if (contract.status === 20) {
            return (
                <button className="btn btn-outline-danger" disabled style={{width: "190px"}} onClick={this.goToContract.bind(this, contract.reference)}>
                    <span className="d-md-block text-danger">Contrato rechazado</span>
                    <i className="fa fa-times-circle text-danger"/>
                </button>
            )
        } else {
            return(
                <button className="btn btn-outline-primary" onClick={this.goToContract.bind(this, contract.reference)}>
                    <span className="d-md-block text-primary">Ver</span>
                    <i className="fa fa-play text-primary"/>
                </button>
            )
        }
    }

    renderContractCards() {
        return (
            this.props.contracts.map((contract, key) => {
                return (
                    <div className="contract-card" key={key}>
                        <div className="div-contract-info">
                            <div className="card">
                                <div className="card-header">
                                    <div className="celebrity-avatar d-none d-md-block">
                                        <img className="celebrity-avatar rounded mt-2"
                                             width="40px"
                                             src={contract.celebrityData.avatar}
                                             alt="avatar"/>
                                    </div>
                                    <div className="from-to">
                                        <h6 className="mt-2 font-weight-bold">
                                            Famoso:
                                            <small className="ml-2">{contract.celebrityData.fullName}</small>
                                        </h6>
                                        <h6 className="mt-2 font-weight-bold">
                                            Para:
                                            <small className="ml-2">{contract.deliveryTo}</small>
                                        </h6>
                                        <h6 className="mt-2 font-weight-bold">
                                            De:
                                            <small className="ml-2">{contract.deliveryFrom}</small>
                                        </h6>
                                    </div>
                                    <div className="button-status">
                                        {this.returnButton(contract)}
                                    </div>
                                </div>
                                <div className="card-body text-justify contract-instructions">
                                    {contract.instructions}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    renderEmptyCard() {
        if (!this.props.isLoading) {
            return (<div className="col-5 mt-2 pt-2 text-center">
                <br/>
                <img width="70%"
                     style={{opacity: "0.3"}}
                     src="/assets/img/sad-face-in-rounded-square.svg" alt="sad-face"/>
                <br/>
                <h4 className="text-muted mt-3">Aún no has realizado una contratación</h4>
                <button className="btn btn-sm btn-primary" onClick={this.goToHome}>
                    Ir a contratar
                    <i className="ml-2 text-white fa fa-arrow-right"/>
                </button>
            </div>)
        }
    }

    render() {
        return (
            <div className="HiringsCardSectionLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
                            <div className="row  justify-content-center section">
                                <div className="col-12 text-center">
                                    <h6 className="mt-3 font-weight-bold border-bottom pb-3">
                                        Mis Contrataciones
                                    </h6>
                                </div>
                                {
                                    this.props.contracts.length
                                        ?
                                        this.renderContractCards()
                                        :
                                        this.renderEmptyCard()
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        );
    };

}

//default props
HiringsCardSectionLayout.defaultProps = {
    contracts: [],
    isLoading: true
};

export {HiringsCardSectionLayout};
