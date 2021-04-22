import React, { Component, useState } from "react";
import { NavLink } from "react-app/src/components/common/routing";
import * as PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import {
  saveContractToPay,
  updateContractIsPublic
} from "../../../state/ducks/contracts/actions";
import { connect } from "react-redux";
import { occasionsData } from "../../../constants/options";
import { Form } from "react-bootstrap";
import { ReviewCreatorLayout } from "../review-creator";
import { withRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const moment = require("moment");

const validStatusToEditIsPublic = [10, 30, 40];

const mapStateToProps = ({ contracts }) => ({
  ...contracts.updateContractReducer
});

const mapDispatchToProps = { saveContractToPay };

class HiringsCardSectionLayout extends Component {
  goToHome() {
    history._pushRoute(PATHS.HOME_PATH);
  }

  ContractCard = ({ contract }) => {
    const celebrityPath = PATHS.CELEBRITY_PROFILE.replace(
      ":celebrity_username",
      contract.celebrityData.username
    );

    return (
      <div className="contract-card">
        <div className="div-contract-info">
          <div className="card">
            <div className="card-header flex-wrap w-100">
              <div className="celebrity-image">
                <NavLink to={celebrityPath}>
                  <img
                    alt="Avatar"
                    width="100%"
                    className={"img-responsive"}
                    src={contract.celebrityData.avatar}
                  />
                </NavLink>
              </div>
              <div className="from-to w-100">
                <div className="d-flex align-items-center">
                  <NavLink to={celebrityPath} className="text-decoration-none">
                    <h5 className="mt-2 font-weight-bold">
                      {contract.celebrityData.fullName}
                    </h5>
                  </NavLink>
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
                    <FormattedMessage
                      defaultMessage="De:"
                      description="Quién esta enviando el video."
                    />
                    <small className="ml-2">{contract.deliveryFrom}</small>
                  </h6>
                ) : null}
                <h6 className="mt-2 font-weight-bold">
                  <FormattedMessage defaultMessage="Correo electrónico de notificación:" />
                  <small className="ml-2">{contract.deliveryContact}</small>
                </h6>
                <IsPublicSwitcher contract={contract} />
                {contract.occasion ? (
                  <h6 className="mt-2 font-weight-bold">
                    <FormattedMessage defaultMessage="Ocasión:" />{" "}
                    <small className="ml-2">
                      {occasionsData[this.props.router.locale][
                        contract.occasion
                      ]?.title || "Otro"}
                    </small>
                  </h6>
                ) : null}
                {contract.status === 40 ? (
                  <ReviewCreatorLayout contract={contract} autoFocus={false} />
                ) : null}
                <div className="button-status">
                  <ContractButton contract={contract} />
                </div>
              </div>
            </div>
            <div className="card-body text-justify contract-instructions">
              <h6 className="font-weight-bold">
                <FormattedMessage
                  defaultMessage="Para:"
                  description="Quien recibirá el video"
                />
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
            <FormattedMessage defaultMessage="Aún no has realizado una contratación" />
          </h4>
          <button className="btn btn-sm btn-primary" onClick={this.goToHome}>
            <FormattedMessage defaultMessage="Ir a contratar" />
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
                    <FormattedMessage defaultMessage="Mis Contrataciones" />
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

const IsPublicSwitcher = ({ contract }) => {
  const [isPublic, setIsPublic] = useState(contract.isPublic);
  const [isLoading, setIsLoading] = useState(false);

  const handleIsPublic = () => {
    if (isLoading) return;
    setIsLoading(true);
    const newIsPublicValue = !isPublic;
    setIsPublic(newIsPublicValue);
    contract.isPublic = newIsPublicValue;
    updateContractIsPublic({
      id: contract.id,
      reference: contract.reference,
      isPublic: newIsPublicValue,
      celebrityId: contract.celebrityData.id
    }).then(() => setIsLoading(false));
  };

  return validStatusToEditIsPublic.includes(contract.status) ? (
    <Form.Check
      type="switch"
      id={`custom-switch-${contract.id}`}
      label="Publicar este video en Famosos.com"
      checked={isPublic}
      disabled={isLoading}
      onChange={handleIsPublic}
    />
  ) : contract.isPublic ? (
    <h6 className="mt-2 font-weight-bold">
      <FormattedMessage defaultMessage="Es público" />
    </h6>
  ) : null;
};

const ContractButton = ({ contract }) => {
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
        onClick={goToPay.bind(this, contract.reference)}
      >
        <FormattedMessage defaultMessage="Finalizar compra" />
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
        <FormattedMessage defaultMessage="Validando el pago" />
        <i className="fa fa-clock" />
      </button>
    );
  } else if (contract.status === 10) {
    return (
      <>
        <div>
          <small>{RenderExpirationMessage(contract.paymentDate)}</small>
        </div>
        <button
          className="btn btn-outline-dark mt-2"
          disabled
          style={{ width: "100%", fontSize: "12px" }}
        >
          <FormattedMessage defaultMessage="En espera de grabación" />
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
        <FormattedMessage defaultMessage="Contrato rechazado" />
        <i className="fa fa-times-circle text-danger" />
      </button>
    );
  } else if (contract.status === 25) {
    return (
      <button
        className="btn btn-outline-dark mt-2"
        disabled
        style={{ width: "100%", fontSize: "12px" }}
      >
        <FormattedMessage defaultMessage="Contrato Expirado" />
        <i className="fa fa-times-circle text-dark" />
      </button>
    );
  } else if (contract.status === 30 || contract.status === 40) {
    return (
      <button
        className="btn btn-outline-primary mt-2"
        onClick={GoToContract.bind(this, contract.reference)}
      >
        <FormattedMessage defaultMessage="Ver video" />
        <i className="fa fa-play text-primary" />
      </button>
    );
  }
};

const GoToContract = (contract_reference) => {
  history._pushRoute(
    PATHS.HIRING_PREVIEW.replace(":contract_reference", "") + contract_reference
  );
};

const goToPay = (contract_reference) => {
  history._pushRoute(
    PATHS.PAYMENT_METHODS.replace(":contract_reference", contract_reference)
  );
};

const RenderExpirationMessage = (date) => {
  const _date = new Date(date);
  require("moment/locale/es");
  _date.setDate(_date.getDate() + 7);
  return (
    <FormattedMessage
      defaultMessage="Esta solicitud expira el {date}"
      values={{ date: moment(_date.toISOString()).format("L") }}
    />
  );
};

//default props
HiringsCardSectionLayout.defaultProps = {
  contracts: [],
  isLoading: true
};

const _HiringsCardSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HiringsCardSectionLayout));

export { _HiringsCardSectionLayout as HiringsCardSectionLayout };
