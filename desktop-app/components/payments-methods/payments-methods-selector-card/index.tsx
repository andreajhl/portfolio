import { useEffect, useRef, useState } from "react";
import { DLocalPersonalInfoForm } from "../dLocal-personal-info-form";
import PaymentMethodsAvailableList from "../payment-methods-available-list";
import styles from "./styles.module.scss";
import { RootState } from "react-app/src/state/store";
import { sessionOperations } from "react-app/src/state/ducks/session";
import { listPaymentGateways } from "react-app/src/state/ducks/payments/operations";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";

const mapStateToProps = (state: RootState) => ({
  userInformation: state.session.getSessionReducer.data,
  userInformationLoading: state.session.getSessionReducer.loading,
  userInformationCompleted: state.session.getSessionReducer.completed,
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
  paymentGatewayLoading: state.payments.fetchPaymentGatewaysReducer.loading,
  paymentMethodsAvailable: state.payments.fetchPaymentGatewaysReducer.data,
  couponData: state.payments.fetchDiscountCouponReducer,
});

const mapDispatchToProps = {
  getToken: sessionOperations.getToken,
  listPaymentGateways,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type PaymentsMethodsSelectorCardProps = {
  contractPrice: number;
  contractReference: string;
} & PropsFromRedux;

function PaymentsMethodsSelectorCard({
  contractPrice,
  contractReference,
  userInformation,
  userInformationCompleted,
  userInformationLoading,
  currencyExchangeData,
  getToken,
  listPaymentGateways,
  currencyExchangeLoading,
  paymentGatewayLoading,
  paymentMethodsAvailable,
  couponData,
}: PaymentsMethodsSelectorCardProps) {
  useEffect(() => {
    if (!userInformationLoading) getToken();
  }, []);
  useEffect(() => {
    listPaymentGateways(currencyExchangeData.to);
  }, [currencyExchangeData.to]);
  const DLocalPersonalInfoFormRef = useRef(null);
  const [dLocalBuyerFormData, setDLocalBuyerFormData] = useState({
    buyer_name: "",
    email_address: "",
    identification_document: "",
  });
  const [errorMessageForDLocalForm, setErrorMessageForDLocalForm] = useState(
    ""
  );

  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <h2 className={styles.PaymentMethodFormTitle}>
        1. Datos de la persona que realiza el pago.
      </h2>
      <Maybe it={!userInformationLoading}>
        <div
          className={styles.PaymentMethodFormSection}
          tabIndex={-1}
          ref={DLocalPersonalInfoFormRef}
        >
          <DLocalPersonalInfoForm
            initialValues={{
              buyer_name: userInformation.fullName,
              email_address: userInformation.email,
              identification_document:
                userInformation.identification_document || "",
            }}
            onChangeValues={setDLocalBuyerFormData}
            errorMessage={errorMessageForDLocalForm}
          />
        </div>
      </Maybe>
      <div className={styles.PaymentMethodFormSection}>
        <h2 className={styles.PaymentMethodFormTitle}>
          2. Selecciona un Método de Pago.
        </h2>
        <PaymentMethodsAvailableList
          onBuyerDataIncomplete={() => {
            DLocalPersonalInfoFormRef.current.focus();
            setErrorMessageForDLocalForm("Por favor ingrese todos los datos");
          }}
          contractPrice={contractPrice}
          contractReference={contractReference}
          payment_methods={paymentMethodsAvailable}
          buyerData={dLocalBuyerFormData}
        />
      </div>
    </div>
  );
}

const _PaymentsMethodsSelectorCard = connector(PaymentsMethodsSelectorCard);

export { _PaymentsMethodsSelectorCard as PaymentsMethodsSelectorCard };
