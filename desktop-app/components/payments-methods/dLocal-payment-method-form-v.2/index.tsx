import {
  DotCircle,
  Ellipse,
  CardIcon,
  CashIcon,
  ExchangeArrowIcon,
} from "desktop-app/components/common/icons";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage } from "lib/custom-intl";
import useProcessDlocalPayment from "lib/hooks/useProcessDlocalPayment";
import useTogglePaymentInProcess from "lib/hooks/useTogglePaymentInProcess";
import { isADLocalPaymentMethodWithCardRequired } from "lib/utils/dLocalPaymentMethodsValidations";
import React, { useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { analytics } from "react-app/src/state/utils/gtm";
import DLocalFormCard from "../DLocal-form-card";
import useBuyerDataState from "../../../../lib/hooks/useBuyerDataState";
import DLocalSelectPaymentMethod from "../DLocal-select-payment-method";
import PaymentMethodFormElement from "../form-element";
import PaymentMethodFormLabel from "../form-label";
import PaymentMethodFormWrapper from "../form-wrapper";
import styles from "./styles.module.scss";
import { DLocalPersonalInfoFormV2 } from "../dLocal-personal-info-form-v.2";
import { defineMessages, useIntl } from "react-intl";

export const AVAILABLE_PAYMENTS_METHODS_LABEL = {
  CREDIT_CARD: <FormattedMessage defaultMessage="Tarjeta de Crédito" />,
  DEBIT_CARD: <FormattedMessage defaultMessage="Tarjeta de Débito" />,
  BANK_TRANSFER: <FormattedMessage defaultMessage="Transferencia Bancaria" />,
  TICKET: <FormattedMessage defaultMessage="Efectivo" />,
  PAYPAL: <FormattedMessage defaultMessage="Paypal" />,
};

const PAYMENTS_METHODS_ICONS = {
  CREDIT_CARD: () => <CardIcon className={styles.CardIcon} />,
  DEBIT_CARD: () => <CardIcon className={styles.CardIcon} />,
  BANK_TRANSFER: () => <ExchangeArrowIcon className={styles.CardIcon} />,
  TICKET: () => <CashIcon className={styles.CardIcon} />,
};

const messages = defineMessages({
  errorDataIncomplete: {
    defaultMessage: "Por favor ingrese todos los datos",
  },
});

type DLocalPaymentMethodFormProps = {
  expanded: boolean;
  index: number;
  onToggle: () => void;
  paymentMethodType: string;
  contractReference: string | number;
  paymentsMethodsAvailable: Array<{
    brand: string;
    id: number;
    identifier: string;
    logo: string;
    name: string;
    redirect: boolean;
  }>;
  discountCouponId: null | number;
  handleBuyerDataIncomplete: () => void;
  celebrityId: number;
  contractPrice: number;
};

function DLocalPaymentMethodFormV2({
  expanded,
  index,
  onToggle,
  paymentsMethodsAvailable,
  paymentMethodType,
  contractReference,
  discountCouponId,
  celebrityId,
  contractPrice,
}: DLocalPaymentMethodFormProps) {
  const { formatMessage } = useIntl();
  const togglePaymentInProcess = useTogglePaymentInProcess();
  const buyerData = useBuyerDataState();
  const sectionId = `section-${index}`;
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [buyerDataError, setBuyerDataError] = useState("");
  const labelId = `label-${index}`;
  const processDlocalPayment = useProcessDlocalPayment();

  function handleBuyerDataIncomplete() {
    setBuyerDataError(formatMessage(messages.errorDataIncomplete));
  }

  const handleStartPayment = async (cardToken, option) => {
    analytics.track("START_DLOCAL_PAYMENT", {
      widget: "DLocalPaymentMethodForm",
      paymentMethodType,
      contractReference,
      discountCouponId,
      contractPrice,
      celebrityId,
    });
    setPaymentInProcess(true);
    togglePaymentInProcess();

    try {
      await processDlocalPayment({
        cardToken,
        paymentMethodId: option.paymentMethodId,
      });
    } catch (error) {
      setPaymentError(error);
      setPaymentInProcess(false);
    } finally {
      togglePaymentInProcess();
    }
  };

  const isMissingBuyerData = () => Object.values(buyerData).includes("");

  const onStartRegisterPayment = (token, option) => {
    setBuyerDataError("");

    // Check if buyer daya is completed
    if (!isMissingBuyerData()) {
      handleStartPayment(token, option);
    } else {
      handleBuyerDataIncomplete();
    }
  };

  return (
    <PaymentMethodFormWrapper>
      <PaymentMethodFormLabel onToggle={onToggle}>
        {PAYMENTS_METHODS_ICONS[paymentMethodType]()}
        <span className={styles.Label}>
          {AVAILABLE_PAYMENTS_METHODS_LABEL[paymentMethodType]}
        </span>
        {expanded ? (
          <DotCircle className={styles.CheckIcon} />
        ) : (
          <Ellipse className={styles.CheckIcon} />
        )}
      </PaymentMethodFormLabel>
      <PaymentMethodFormElement
        labelId={labelId}
        sectionId={sectionId}
        expanded={expanded}
      >
        <DLocalPersonalInfoFormV2 errorMessage={buyerDataError} />
        <Maybe it={expanded}>
          <Maybe
            it={isADLocalPaymentMethodWithCardRequired(paymentMethodType)}
            orElse={
              <DLocalSelectPaymentMethod
                onStartPayment={(paymentMethodId) =>
                  onStartRegisterPayment(null, paymentMethodId)
                }
                paymentMethodType={paymentMethodType}
                paymentsMethodsAvailable={paymentsMethodsAvailable}
                disabled={paymentInProcess}
                paymentInProcess={paymentInProcess}
              />
            }
          >
            <DLocalFormCard
              paymentMethodType={paymentMethodType}
              paymentsMethodsAvailable={paymentsMethodsAvailable}
              paymentInProcess={paymentInProcess}
              handleStartPayment={onStartRegisterPayment}
              disabled={paymentInProcess}
            />
          </Maybe>
        </Maybe>
        <Maybe it={paymentError !== ""}>
          <WarningMessage
            className={styles.PaymentErrorMessage}
            message={paymentError}
          />
        </Maybe>
      </PaymentMethodFormElement>
    </PaymentMethodFormWrapper>
  );
}

export default DLocalPaymentMethodFormV2;
