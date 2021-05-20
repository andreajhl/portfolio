import { connect } from "react-redux";
import DLocalPersonalInfoForm from "../dLocal-personal-info-form";
import PaymentMethodsAvailableList from "../payment-methods-available-list";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type PaymentsMethodsSelectorCardProps = {} & StateProps & DispatchProps;

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
  ...props
}: PaymentsMethodsSelectorCardProps) {
  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <div className={styles.PaymentMethodFormSection}>
        <h2 className={styles.PaymentMethodFormTitle}>
          1. Datos de la persona que realiza el pago.
        </h2>
        <DLocalPersonalInfoForm />
      </div>
      <div className={styles.PaymentMethodFormSection}>
        <h2 className={styles.PaymentMethodFormTitle}>
          2. Selecciona un Método de Pago.
        </h2>
        <PaymentMethodsAvailableList payment_methods={mock_payments_methods} />
      </div>
    </div>
  );
}

const _PaymentsMethodsSelectorCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsMethodsSelectorCard);

export { _PaymentsMethodsSelectorCard as PaymentsMethodsSelectorCard };
