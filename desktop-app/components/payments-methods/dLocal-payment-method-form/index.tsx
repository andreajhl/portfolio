import { USER_IP_ADDRESS } from "constants/keys";
import { getPurchaseSummaryPath } from "constants/paths";
import {
  DotCircle,
  Ellipse,
  CardIcon,
  CashIcon,
  ExchangeArrowIcon,
} from "desktop-app/components/common/icons";
import WarningMessage from "desktop-app/components/common/warning-message";
import { FormattedMessage, useIntl } from "lib/custom-intl";
import useTogglePaymentInProcess from "lib/hooks/useTogglePaymentInProcess";
import { isADLocalPaymentMethodWithCardRequired } from "lib/utils/dLocalPaymentMethodsValidations";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
import openNewTab from "lib/utils/openNewTab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { processDlocalPayment } from "react-app/src/state/ducks/payments/actions";
import { analytics } from "react-app/src/state/utils/gtm";
import { getIpAddress } from "react-app/src/state/utils/localizationApiService";
import { generateDeviceId } from "react-app/src/utils/generateDeviceId";
import getCookie from "react-app/src/utils/getCookie";
import DLocalFormCard from "../DLocal-form-card";
import DLocalSelectPaymentMethod from "../DLocal-select-payment-method";
import styles from "./styles.module.scss";

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
  buyerData: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  };
  discountCouponId: null | number;
  handleBuyerDataIncomplete: () => void;
  celebrityId: number;
  contractPrice: number;
};

function DLocalPaymentMethodForm({
  expanded,
  index,
  onToggle,
  paymentsMethodsAvailable,
  paymentMethodType,
  buyerData,
  handleBuyerDataIncomplete,
  contractReference,
  discountCouponId,
  celebrityId,
  contractPrice,
}: DLocalPaymentMethodFormProps) {
  const { push } = useRouter();
  const { locale } = useIntl();
  const togglePaymentInProcess = useTogglePaymentInProcess();

  const sectionId = `section-${index}`;
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const labelId = `label-${index}`;

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

    const {
      deviceId,
      IP,
      userAgent,
      geoLocalization,
    } = await getBuyerIdentityData();

    try {
      processDlocalPayment(
        contractReference,
        option.paymentMethodId,
        buyerData.buyer_name,
        buyerData.email_address,
        buyerData.identification_document,
        discountCouponId,
        cardToken,
        deviceId,
        IP,
        userAgent,
        geoLocalization,
        locale
      )
        .then((response) => {
          if (
            ["PAID", "AUTHORIZED", "PENDING"].includes(response.chargeStatus)
          ) {
            if (response.requiredRedirect) {
              openNewTab(response.redirectUri);
            } else {
              analytics.trackContractPurchase({
                contractPrice,
                celebrityId,
              });
              analytics.track("CONTRACT_PAYED", {
                widget: "DLocalPaymentMethodForm",
                paymentMethod: "DLocal",
                contractReference,
                discountCouponId,
                contractPrice,
                celebrityId,
              });
            }
            push(getPurchaseSummaryPath(String(contractReference)));
          } else {
            setPaymentError(response.statusDetails);
            setPaymentInProcess(false);
          }
        })
        .catch((e) => {
          setPaymentError(e);
          setPaymentInProcess(false);
        })
        .finally(() => togglePaymentInProcess());
    } catch (e) {
      setPaymentInProcess(false);
      setPaymentError(e);
      togglePaymentInProcess();
    }
  };

  const isMissingBuyerData = () => Object.values(buyerData).includes("");

  const onStartRegisterPayment = (token, option) => {
    // Check if buyer daya is completed
    if (!isMissingBuyerData()) {
      handleStartPayment(token, option);
    } else {
      handleBuyerDataIncomplete();
    }
  };
  return (
    <div className={styles.FormSection}>
      <div
        role="button"
        onClick={onToggle}
        onKeyDown={(e) => {
          switch (e.key) {
            case " ":
            case "Enter":
              onToggle();
              break;
            default:
          }
        }}
        className={styles.FormLabel}
      >
        {PAYMENTS_METHODS_ICONS[paymentMethodType]()}

        <span className={styles.Label}>
          {AVAILABLE_PAYMENTS_METHODS_LABEL[paymentMethodType]}
        </span>
        {expanded ? (
          <DotCircle className={styles.CheckIcon} />
        ) : (
          <Ellipse className={styles.CheckIcon} />
        )}
      </div>
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
      >
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
      </div>
    </div>
  );
}

export default DLocalPaymentMethodForm;
