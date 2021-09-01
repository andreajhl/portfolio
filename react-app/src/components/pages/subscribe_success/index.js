import React, { useEffect } from "react";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { FEED_SUBSCRIPTION } from "../../../routing/Paths";
import { useRouter } from "next/router";
import { CheckIconList } from "../../layouts/check-icon-list";
import { FormattedMessage } from "react-intl";

const textBold = (chunk) => <span className="font-weight-bold">{chunk}</span>;

function SubscriptionSuccess({
  celebrityUsername,
  getCelebrity,
  celebrity,
  isLoading,
}) {
  const router = useRouter();

  useEffect(() => {
    if (!celebrityUsername) return;
    getCelebrity(celebrityUsername);
  }, [celebrityUsername]);

  const celebrityFullName = celebrity?.fullName || "Famoso";

  return (
    <div className="container-subscribe-success container-fluid">
      <div className="row justify-content-center f-container">
        <div className="col-12 col-md-6 col-xl-4 mx-auto text-center f-card">
          <div className="w-100 mx-auto text-center logo-famosos">
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
                isLoading
                  ? "/assets/img/avatar-blank.png"
                  : celebrity.avatar || ""
              }
              alt="Avatar"
            />
          </div>
          <div className="mt-4 font-weight-bold">
            <h5 className={"font-weight-bold"}>
              <FormattedMessage defaultMessage="¡Felicitaciones!" />
            </h5>
            <h5 className={"font-weight-bold"}>
              <FormattedMessage
                defaultMessage="Tu suscripción con {celebrityFullName} fue exitosa."
                values={{ celebrityFullName }}
              />
            </h5>
          </div>
          <div className="mt-4 pl-3 pr-3 font-weight-light text-left">
            <h6>
              <FormattedMessage defaultMessage="A partir de ahora disfrutarás de beneficios únicos que te harán quererl@ todavía más." />
            </h6>
            <CheckIconList
              className="SubscriptionSuccessBenefitsList"
              items={[
                <FormattedMessage defaultMessage="Descuento en tu próxima compra de video personalizado." />,
                <FormattedMessage defaultMessage="Entrada con descuento a eventos." />,
                <FormattedMessage
                  defaultMessage="Acceso a contenido exclusivo de {celebrityFullName}."
                  values={{ celebrityFullName }}
                />,
                <FormattedMessage defaultMessage="Participación en sorteos y posibilidad de recibir artículos autografiados." />,
                <FormattedMessage defaultMessage="¡Sorpresas que te harán reír y suspirar!" />,
              ]}
            />
          </div>
          <p>
            <FormattedMessage
              defaultMessage="<textBold>¡Recuerda!</textBold> Cada 30 días se hará el cobro de la suscripción de manera automática. Te enviaremos una notificación cuando se realice el cobro a tu TDC o PayPal asociado."
              values={{ textBold }}
            />
          </p>
          <button
            className="btn btn-primary mb-4"
            onClick={() => router.push(FEED_SUBSCRIPTION)}
          >
            <FormattedMessage defaultMessage="Ver mis suscripciones" />
          </button>
        </div>
      </div>
    </div>
  );
}

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get,
};
// Set propTypes
SubscriptionSuccess.propTypes = {};

// Set defaultProps
SubscriptionSuccess.defaultProps = {};

const _SubscriptionSuccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionSuccess);

export { _SubscriptionSuccess as SubscriptionSuccess };
