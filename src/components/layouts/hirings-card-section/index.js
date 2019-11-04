import React, {Component} from 'react';
import "./styles.scss";
import * as PATHS from "../../../routing/Paths";
import {history} from "../../../routing/History";


class HiringsCardSectionLayout extends Component {

    goToContract(contract_reference) {
        history.push(PATHS.HIRING_PREVIEW.replace(":hiring_reference", "") + contract_reference)
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
                                             src={contract.celebrity.avatar}
                                             alt="avatar"/>
                                    </div>
                                    <div className="from-to">
                                        <h6 className="mt-2 font-weight-bold">
                                            Famoso:
                                            <small className="ml-2">{contract.celebrity.full_name}</small>
                                        </h6>
                                        <h6 className="mt-2 font-weight-bold">
                                            Para:
                                            <small className="ml-2">{contract.delivery_to}</small>
                                        </h6>
                                        <h6 className="mt-2 font-weight-bold">
                                            De:
                                            <small className="ml-2">{contract.delivery_from}</small>
                                        </h6>
                                    </div>
                                    <div className="button-status">
                                        {
                                            contract.status <= 30
                                                ?
                                                <button className="btn btn-outline-dark" disabled>
                                                    <span className="d-none d-md-block">Pendiente</span>
                                                    <i className="ml-0 ml-sm-2 mt-0 mt-sm-1 fa fa-clock"/>
                                                </button>
                                                :
                                                <button className="btn btn-outline-success" onClick={this.goToContract.bind(this, contract.reference)}>
                                                    <span className="d-none d-md-block">Ver Video</span>
                                                    <i className="ml-0 ml-sm-2 mt-0 mt-sm-1 fa fa-play"/>
                                                </button>
                                        }
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

    render() {
        return (
            <div className="HiringsCardSectionLayout">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
                            <div className="row  justify-content-center section">
                                <div className="col-12 text-center">
                                    <h4 className="mt-3 font-weight-bold border-bottom pb-3">
                                        Mis Contrataciones
                                    </h4>
                                </div>
                                {
                                    this.props.contracts.length
                                        ?
                                        this.renderContractCards()
                                        :
                                        <div className="col-5 mt-4 pt-4 text-center">
                                            <img width="100%"
                                                style={{opacity: "0.4"}}
                                                 src="/assets/img/sad-face-in-rounded-square.svg" alt="sad-face"/>
                                            <h4 className="text-muted mt-3">Aún no has realizado una contratación</h4>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

//default props
HiringsCardSectionLayout.defaultProps = {
    contracts: []
};

export {HiringsCardSectionLayout};
