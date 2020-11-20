import React, { Component, useState } from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import { saveContractToPay } from "../../../state/ducks/contracts/actions";
import { connect } from "react-redux";
import { occasionsData } from "../../../constants/options";

const moment = require("moment");

const mapStateToProps = ({ contracts }) => ({
  ...contracts.updateContractReducer
});

const mapDispatchToProps = { saveContractToPay };

class HiringsCardSectionLayout extends Component {
  constructor(props) {
    super(props);
  }

  goToContract(contract_reference) {
    history._pushRoute(
      PATHS.HIRING_PREVIEW.replace(":contract_reference", "") +
        contract_reference
    );
  }

  goToHome() {
    history._pushRoute(PATHS.HOME_PATH);
  }

  goToPay(contract_reference) {
    history._pushRoute(
      PATHS.PAYMENT_METHODS.replace(":contract_reference", contract_reference)
    );
  }

  renderExpirationMessage = (date) => {
    const _date = new Date(date);
    require("moment/locale/es");
    _date.setDate(_date.getDate() + 7);
    return (
      "Esta solicitud expira el " + moment(_date.toISOString()).format("L")
    );
  };

  ContractButton = ({ contract }) => {
    // CONTRACT_CREATED = 5
    // CONTRACT_PENDING_TO_PAY = 6
    // CONTRACT_PAYED_BY_CLIENT = 10
    // CONTRACT_REJECTED = 20
    // CONTRACT_EXPIRED = 25
    // CONTRACT_RECORDED = 30
    // CONTRACT_COMPLETED = 40

    if (contract.status === 5) {
      return (
        <button
          className="btn btn-outline-primary mt-2"
          style={{ width: "100%", fontSize: "12px" }}
          onClick={this.goToPay.bind(this, contract.reference)}
        >
          Finalizar compra
          <i className="fa fa-arrow-right text-primary" />
        </button>
      );
    } else if (contract.status === 6) {
      return (
        <button
          className="btn btn-outline-dark mt-2"
          disabled
          style={{ width: "100%", fontSize: "12px" }}
        >
          Validando el pago
          <i className="fa fa-clock" />
        </button>
      );
    } else if (contract.status === 10) {
      return (
        <>
          <div>
            <small>{this.renderExpirationMessage(contract.paymentDate)}</small>
          </div>
          <button
            className="btn btn-outline-dark mt-2"
            disabled
            style={{ width: "100%", fontSize: "12px" }}
          >
            En espera de grabación
            <i className="fa fa-clock" />
          </button>
        </>
      );
    } else if (contract.status === 20) {
      return (
        <button
          className="btn btn-outline-danger mt-2"
          disabled
          style={{ width: "100%", fontSize: "12px" }}
        >
          Contrato rechazado
          <i className="fa fa-times-circle text-danger" />
        </button>
      );
    } else if (contract.status === 25) {
      return (
        <button
          className="btn btn-outline-light mt-2"
          disabled
          style={{ width: "100%", fontSize: "12px" }}
        >
          Contrato Expirado
          <i className="fa fa-times-circle text-dark" />
        </button>
      );
    } else if (contract.status === 30 || contract.status === 40) {
      return (
        <button
          className="btn btn-outline-primary mt-2"
          onClick={this.goToContract.bind(this, contract.reference)}
        >
          Ver video
          <i className="fa fa-play text-primary" />
        </button>
      );
    }
  };

  ContractCard = ({ contract }) => {
    return (
      <div className="contract-card">
        <div className="div-contract-info">
          <div className="card">
            <div className="card-header flex-wrap w-100">
              <div className="celebrity-image">
                <img
                  width={"100%"}
                  className={"img-responsive"}
                  src={contract.celebrityData.avatar}
                />
              </div>
              <div className="from-to w-100">
                <div className="d-flex align-items-center">
                  <h5 className="mt-2 font-weight-bold">
                    {contract.celebrityData.fullName}
                  </h5>
                  {contract.status === 10 ? (
                    <NavLink
                      to={PATHS.HIRING_EDITOR.replace(
                        ":contract_reference",
                        contract.reference
                      )}
                      className="ml-auto"
                    >
                      <button
                        className="btn btn-lg"
                        onClick={() =>
                          this.props.saveContractToPay({
                            ...contract,
                            celebrity: contract.celebrityData
                          })
                        }
                      >
                        <i className="fa fa-edit text-primary"></i>
                      </button>
                    </NavLink>
                  ) : null}
                </div>
                {contract.deliveryFrom ? (
                  <h6 className="mt-2 font-weight-bold">
                    De:<small className="ml-2">{contract.deliveryFrom}</small>
                  </h6>
                ) : null}
                <h6 className="mt-2 font-weight-bold">
                  Correo eléctronico de notificación:
                  <small className="ml-2">{contract.deliveryContact}</small>
                </h6>
                {contract.isPublic ? (
                  <h6 className="mt-2 font-weight-bold">Público</h6>
                ) : null}
                {contract.occasion ? (
                  <h6 className="mt-2 font-weight-bold">
                    Ocasión:{" "}
                    <small className="ml-2">
                      {occasionsData[contract.occasion]?.title || "Otro"}
                    </small>
                  </h6>
                ) : null}
                <div className="button-status">
                  <this.ContractButton contract={contract} />
                </div>
              </div>
            </div>
            <div className="card-body text-justify contract-instructions">
              <h6 className="font-weight-bold">
                Para:
                <small className="ml-2">{contract.deliveryTo}</small>
              </h6>
              <p>{contract.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderContractCards() {
    return this.props.contracts.map((contract, key) => (
      <this.ContractCard contract={contract} key={key} />
    ));
  }

  renderEmptyCard() {
    if (!this.props.isLoading) {
      return (
        <div className="col-sm-10 col-md-5 mt-2 pt-2 text-center">
          <br />
          <img
            width="200px"
            style={{ opacity: "0.2" }}
            src="/assets/img/sad-face-in-rounded-square.svg"
            alt="sad-face"
          />
          <br />
          <h4 className="text-muted mt-3">
            Aún no has realizado una contratación
          </h4>
          <button className="btn btn-sm btn-primary" onClick={this.goToHome}>
            Ir a contratar
            <i className="ml-2 text-white fa fa-arrow-right" />
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="HiringsCardSectionLayout">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="f-main-padding mt-4 f-shadow rounded f-rounded">
              <div className="row  justify-content-center section mx-0">
                <div className="col-12 text-center">
                  <h6 className="mt-3 font-weight-bold border-bottom pb-3">
                    Mis Contrataciones
                  </h6>
                </div>
                {this.props.contracts.length
                  ? this.renderContractCards()
                  : this.renderEmptyCard()}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

//default props
HiringsCardSectionLayout.defaultProps = {
  contracts: [],
  isLoading: true
};

const _HiringsCardSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(HiringsCardSectionLayout);

export { _HiringsCardSectionLayout as HiringsCardSectionLayout };
