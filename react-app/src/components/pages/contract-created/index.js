import React, { Component } from "react";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { Session } from "../../../state/utils/session";
import * as GTM from "../../../state/utils/gtm";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";
import moment from "moment";
import Maybe from "../../common/helpers/maybe";
import { FormattedMessage } from "react-intl";

class ContractCreatedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goToMyHirings = this.goToMyHirings.bind(this);
    this.goToCreateAccount = this.goToCreateAccount.bind(this);
    this.goToCompleteProfile = this.goToCompleteProfile.bind(this);

    this.session = new Session();
  }

  componentDidMount() {
    this.props.contractToPayClear();
    this.props.getContract(this.props.contractReference);
    GTM.tagManagerDataLayer(
      "CONTYRACT_PENDING_TO_PAY_PAGE_VIEW",
      this.props.contractReference
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
        return [
          <FormattedMessage defaultMessage="Pago creado" />,
          "far fa-check-circle"
        ];
      case 20:
        return [
          <FormattedMessage defaultMessage="Pago cancelado" />,
          "far fa-window-close"
        ];
      case 30:
        return [
          <FormattedMessage defaultMessage="Pago rechazado" />,
          "fas fa-ban"
        ];
      case 40:
        return [
          <FormattedMessage defaultMessage="Pago pendiente" />,
          "far fa-clock"
        ];
      case 50:
        return [
          <FormattedMessage defaultMessage="Reembolso fallido" />,
          "fas fa-ban"
        ];
      case 55:
        return [
          <FormattedMessage defaultMessage="Falló autorización de cobro" />,
          "fas fa-ban"
        ];
      case 60:
        return [
          <FormattedMessage defaultMessage="Cobro fallido" />,
          "fas fa-ban"
        ];
      case 70:
        return [
          <FormattedMessage defaultMessage="Reembolso exitoso" />,
          "far fa-check-circle"
        ];
      case 80:
        return [
          <FormattedMessage defaultMessage="Pago expirado" />,
          "far fa-clock"
        ];
      case 90:
        return [
          <FormattedMessage defaultMessage="Pago autorizado" />,
          "far fa-check-circle text-success"
        ];
      case 100:
        return [
          <FormattedMessage defaultMessage="Pago completado" />,
          "far fa-check-circle text-success"
        ];
      default:
        return ["", ""];
    }
  };

  renderStripe() {
    const lastPayment = this.props?.resumen?.lastPayment;

    return (
      <PageContainer
        showNavbar={false}
        showFiltersSection={false}
        showFooter={false}
        showBotMakerFrame
      >
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
                <img
                  className="rounded-circle"
                  src={
                    this.props.isLoading
                      ? "/assets/img/avatar-blank.png"
                      : this.props.resumen.celebrity.avatar || ""
                  }
                  alt="avatar"
                />
              </div>
              <p className="mt-4 font-weight-bold">
                <h5 className={"font-weight-bold"}>
                  <FormattedMessage defaultMessage="¡Felicitaciones!" />
                </h5>
                <h5 className={"font-weight-bold"}>
                  {" "}
                  <FormattedMessage
                    defaultMessage="  Se ha realizado con éxito la pre-autorización del cobro a tu
                  cuenta"
                  />
                  .
                </h5>
              </p>
              <p className="mt-4 pl-3 pr-3 font-weight-light text-left">
                <h6>
                  <FormattedMessage defaultMessage="Ten en cuenta:" />
                </h6>
                <li>
                  <FormattedMessage
                    defaultMessage="
                  {celebrityFullName} tiene un plazo de
                  <b>7 días</b> para grabar tu video a partir de hoy."
                    values={{
                      celebrityFullName: this.props.resumen.celebrity.fullName,
                      b: (chunks) => <b>{chunks}</b>
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="El <b>cobro se realizará</b> una vez que
                  {celebrityFullName} grabe tu video."
                    values={{
                      celebrityFullName: this.props.resumen.celebrity.fullName,
                      b: (chunks) => <b>{chunks}</b>
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Recibirás una notificación a
                  <b></b> cuando tu
                  video esté listo."
                    values={{
                      b: (chunks) => (
                        <b>{this.props.resumen.contract.deliveryContact}</b>
                      )
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Si todo está bien con tu solicitud de acuerdo a nuestras
                  políticas, muy pronto podrás disfrutar de tu videomensaje."
                  />
                </li>
              </p>
              <button
                className="btn btn-primary mb-4"
                onClick={this.goToMyHirings}
              >
                <FormattedMessage defaultMessage="Ver mis contrataciones" />
              </button>
              <div className="w-100 mx-auto mb-4">
                <Maybe it={lastPayment}>
                  <div className="card mb-3">
                    <div
                      className={
                        "card-header d-flex justify-content-between align-items-center"
                      }
                    >
                      <>
                        <h5 className="mb-0">
                          {
                            this.returnPaymentStatusLabel(
                              lastPayment?.status
                            )[0]
                          }
                        </h5>
                        <i
                          className={
                            this.returnPaymentStatusLabel(
                              lastPayment?.status
                            )[1]
                          }
                        />
                      </>
                    </div>
                    <div className="card-body">
                      <div>
                        <p className="card-text text-muted text-left">
                          <FormattedMessage defaultMessage="Fecha:" />{" "}
                          {moment(lastPayment?.createdAt).format("L")}
                        </p>
                        <p className="card-text text-muted text-left">
                          <FormattedMessage defaultMessage="Hora:" />{" "}
                          {moment(lastPayment?.createdAt).format("LT")}
                        </p>
                        <p className="card-text text-muted text-left">
                          <FormattedMessage defaultMessage="Transacción Reference:" />{" "}
                          {lastPayment?.transactionChargeId}
                        </p>
                      </div>
                    </div>
                  </div>
                </Maybe>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
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
const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractWithPaymentsReducer.loading,
  resumen: state.contracts.getContractWithPaymentsReducer.data,
  contractCreated: state.contracts.saveClientContractReducer.data
});
// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContractWithPayments,
  contractToPayClear: contractOperations.saveContractToPayClear
};

// Export Class
const _ContractCreatedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractCreatedPage);
export { _ContractCreatedPage as ContractCreatedPage };
