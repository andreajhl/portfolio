import styles from "./styles.module.scss";
import StripeForm from "../stripe-form";
import Maybe from "desktop-app/components/common/helpers/maybe";
import PaypalForm from "../paypal-form";
import DLocalPaymentMethodForm from "../dLocal-payment-method-form";
import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";
import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { SpreedlyForm } from "../spreedly-form";
import { PaymentMethodNameType } from "desktop-app/types/payment-methods";
import useCurrentPaymentMethodSelected from "../../../../lib/hooks/useCurrentPaymentMethodSelected";

const isProcessingPayment = ({ payments }: RootState) =>
  payments.setPaymentInProcess.processing;

type PaymentMethodsAvailableListProps = {
  payment_methods: {
    paymentMethodType: PaymentMethodNameType;
    availablePaymentMethods?: {
      id: number;
      identifier: string;
      name: string;
      brand: string;
      redirect: boolean;
      logo: string;
    }[];
  }[];
  contractPrice: number;
  contractReference: string;
  buyerData: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  };
  onBuyerDataIncomplete: () => void;
  discountCouponId: number | null;
  celebrityId: number;
};

function PaymentMethodsAvailableList({
  payment_methods,
  contractPrice,
  contractReference,
  buyerData,
  onBuyerDataIncomplete,
  discountCouponId,
  celebrityId,
}: PaymentMethodsAvailableListProps) {
  const [
    useCurrentOption,
    changeCurrentPaymentMethodSelected,
  ] = useCurrentPaymentMethodSelected();
  const disabledAccordion = useSelector(isProcessingPayment);

  const handleChangeCurrentOption = (newValue: PaymentMethodNameType) => {
    if (disabledAccordion) return;
    changeCurrentPaymentMethodSelected(newValue);
  };

  return (
    <>
      {payment_methods.map((el, index) => (
        <div
          className={styles.PaymentMethodsAvailable}
          key={el.paymentMethodType}
        >
          <Maybe it={el.paymentMethodType === "STRIPE"}>
            <StripeForm
              contractPrice={contractPrice}
              contractReference={contractReference}
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "SPREEDLY"}>
            <SpreedlyForm
              index={index}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              expanded={useCurrentOption === el.paymentMethodType}
              contractReference={contractReference}
              discountCouponId={discountCouponId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "PAYPAL"}>
            <PaypalForm
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              contractPrice={contractPrice}
              discountCouponId={discountCouponId}
              contractReference={contractReference}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={isAValidDLocalPaymentMethod(el.paymentMethodType)}>
            <DLocalPaymentMethodForm
              paymentMethodType={el.paymentMethodType}
              paymentsMethodsAvailable={el.availablePaymentMethods}
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              buyerData={buyerData}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              contractReference={contractReference}
              handleBuyerDataIncomplete={onBuyerDataIncomplete}
              celebrityId={celebrityId}
              contractPrice={contractPrice}
            />
          </Maybe>
        </div>
      ))}
    </>
  );
}

export default PaymentMethodsAvailableList;
