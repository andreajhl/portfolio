import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DLocalPersonalInfoForm } from "../dLocal-personal-info-form";
import PaymentMethodsAvailableList from "../payment-methods-available-list";
import styles from "./styles.module.scss";
import { RootState } from "react-app/src/state/store";
import { sessionOperations } from "react-app/src/state/ducks/session";
import { listPaymentGateways } from "react-app/src/state/ducks/payments/operations";
import { connect, ConnectedProps, useSelector } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { CouponForm } from "../coupon-form";
import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";
import { PaymentMethodsSelectorCardSkeleton } from "./skeleton";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const mapStateToProps = (state: RootState) => ({
  userInformation: state.session.getSessionReducer.data,
  userInformationLoading: state.session.getSessionReducer.loading,
  userInformationCompleted: state.session.getSessionReducer.completed,
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  currencyExchangeLoading: state.payments.currencyExchangeReducer.loading,
  paymentGatewayLoading: state.payments.fetchPaymentGatewaysReducer.loading,
  paymentMethodsAvailable: state.payments.fetchPaymentGatewaysReducer.data,
  couponData: state.payments.fetchDiscountCouponReducer,
  currentPaymentMethodSelected: state.payments.userPaymentMethodSelected.name,
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
  celebrityId: number;
} & PropsFromRedux;

const messages = defineMessages({
  errorDataIncomplete: {
    defaultMessage: "Por favor ingrese todos los datos",
  },
});

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
  currentPaymentMethodSelected,
  celebrityId,
}: PaymentsMethodsSelectorCardProps) {
  console.log(couponData);

  const { formatMessage } = useIntl();
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

  const shouldDisplayDLocalForm = isAValidDLocalPaymentMethod(
    currentPaymentMethodSelected
  );

  return (
    <Maybe
      it={!userInformationLoading && !paymentGatewayLoading}
      orElse={<PaymentMethodsSelectorCardSkeleton />}
    >
      <div className={styles.PaymentsMethodsSelectorCard}>
        {shouldDisplayDLocalForm ? (
          <>
            <h2 className={styles.PaymentMethodFormTitle}>
              <FormattedMessage defaultMessage="1. Datos de la persona que realiza el pago." />
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
                  currency={currencyExchangeData.to}
                />
              </div>
            </Maybe>{" "}
          </>
        ) : null}
        <div className={styles.PaymentMethodFormSection}>
          <h2 className={styles.PaymentMethodFormTitle}>
            {shouldDisplayDLocalForm ? 2 : 1}.
            <FormattedMessage defaultMessage="Selecciona un Método de Pago." />
          </h2>
          <PaymentMethodsAvailableList
            discountCouponId={couponData.data?.id || null}
            onBuyerDataIncomplete={() => {
              DLocalPersonalInfoFormRef.current.focus();
              setErrorMessageForDLocalForm(
                formatMessage(messages.errorDataIncomplete)
              );
            }}
            contractPrice={contractPrice}
            contractReference={contractReference}
            payment_methods={paymentMethodsAvailable}
            buyerData={dLocalBuyerFormData}
            celebrityId={celebrityId}
          />
        </div>
        <div className={styles.PaymentMethodFormSection}>
          <CouponForm contractReference={contractReference} />
        </div>
        <div>
          <img
            className={styles.PaymentSecureBanner}
            src="/assets/img/pago-seguro100.png"
            alt="Pago seguro"
          />
          <p className={styles.DisclaimerTermsAndPolicies}>
            <FormattedMessage
              defaultMessage="Al continuar estás aceptando nuestros Términos y Condiciones y
            nuestra Política de privacidad."
            />
          </p>
        </div>
      </div>
    </Maybe>
  );
}

const _PaymentsMethodsSelectorCard = connector(PaymentsMethodsSelectorCard);

export default PaymentsMethodsSelectorCard;

export { _PaymentsMethodsSelectorCard as PaymentsMethodsSelectorCard };
