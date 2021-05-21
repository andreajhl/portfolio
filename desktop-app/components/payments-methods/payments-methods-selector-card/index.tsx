import { useEffect, useState } from "react";
import { DLocalPersonalInfoForm } from "../dLocal-personal-info-form";
import PaymentMethodsAvailableList from "../payment-methods-available-list";
import styles from "./styles.module.scss";
import { RootState } from "react-app/src/state/store";
import { sessionOperations } from "react-app/src/state/ducks/session";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";

const mapStateToProps = (state: RootState) => ({
  userInformation: state.session.getSessionReducer.data,
  userInformationLoading: state.session.getSessionReducer.loading,
  userInformationCompleted: state.session.getSessionReducer.completed,
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

const mapDispatchToProps = {
  getToken: sessionOperations.getToken,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type PaymentsMethodsSelectorCardProps = {
  contractPrice: number;
  contractReference: string;
} & PropsFromRedux;

const AVAILABLE_PAYMENTS_METHODS_DLOCAL = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "BANK_TRANSFER",
  "TICKET",
] as const;
const AVAILABLE_PAYMENTS_METHOD_PAYPAL = ["PAYPAL", "STRIPE"] as const;
const AVAILABLE_PAYMENTS_METHOD_STRIPE = ["STRIPE"] as const;

const ALL_AVAILABLE_PAYMENTS_METHODS = [
  ...AVAILABLE_PAYMENTS_METHODS_DLOCAL,
  ...AVAILABLE_PAYMENTS_METHOD_PAYPAL,
  ...AVAILABLE_PAYMENTS_METHOD_STRIPE,
] as const;

type all_payments_methods = typeof ALL_AVAILABLE_PAYMENTS_METHODS[number];
type PaymentMethodsAvailableListProps = {
  paymentMethodType:
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "BANK_TRANSFER"
    | "TICKET"
    | "PAYPAL"
    | "STRIPE";
  // availablePaymentMethods?: {
  //   id: number;
  //   identifier: string;
  //   name: string;
  //   brand: string;
  //   redirect: boolean;
  //   logo: string;
  // }[];
}[];
const mock_payments_methods: PaymentMethodsAvailableListProps = [
  {
    paymentMethodType: "STRIPE",
    // availablePaymentMethods: [
    //   {
    //     id: 1,
    //     identifier: "STRIPE",
    //     name: "Stripe Cards",
    //     brand: "",
    //     redirect: false,
    //     logo: "https://famosos-media.s3.amazonaws.com/Logo_stripe.jpg",
    //   },
    // ],
  },
  {
    paymentMethodType: "PAYPAL",
    // availablePaymentMethods: [
    //   {
    //     id: 54,
    //     identifier: "PAYPAL",
    //     name: "Paypal",
    //     brand: "",
    //     redirect: true,
    //     logo: "paypal",
    //   },
    // ],
  },
];

function PaymentsMethodsSelectorCard({
  contractPrice,
  contractReference,
  userInformation,
  userInformationCompleted,
  userInformationLoading,
  currencyExchangeData,
  getToken,
}: PaymentsMethodsSelectorCardProps) {
  useEffect(() => {
    if (!userInformationLoading) getToken();
  }, []);
  const [dLocalBuyerFormData, setDLocalBuyerFormData] = useState({
    buyer_name: "",
    email_address: "",
    identification_document: "",
  });
  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <Maybe it={!userInformationLoading}>
        <div className={styles.PaymentMethodFormSection}>
          <h2 className={styles.PaymentMethodFormTitle}>
            1. Datos de la persona que realiza el pago.
          </h2>
          <DLocalPersonalInfoForm
            initialValues={{
              buyer_name: userInformation.fullName,
              email_address: userInformation.email,
              identification_document:
                userInformation.identification_document || "",
            }}
            onChangeValues={setDLocalBuyerFormData}
          />
        </div>
      </Maybe>
      <div className={styles.PaymentMethodFormSection}>
        <h2 className={styles.PaymentMethodFormTitle}>
          2. Selecciona un Método de Pago.
        </h2>
        <PaymentMethodsAvailableList
          contractPrice={contractPrice}
          contractReference={contractReference}
          payment_methods={mock_payments_methods}
        />
      </div>
    </div>
  );
}

const _PaymentsMethodsSelectorCard = connector(PaymentsMethodsSelectorCard);

export { _PaymentsMethodsSelectorCard as PaymentsMethodsSelectorCard };
