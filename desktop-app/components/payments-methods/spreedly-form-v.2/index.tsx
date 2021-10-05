import React, { useCallback, useEffect, useState } from "react";
import PaymentMethodFormWrapper from "../form-wrapper";
import PaymentMethodFormLabel from "../form-label-v.2";
import PaymentMethodFormElement from "../form-element-v.2";
import { FormattedMessage } from "lib/custom-intl";
import {
  CardIcon,
  DotCircle,
  Ellipse,
} from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import { LoadingSpinner } from "desktop-app/components/common/loading-spinner";
import {
  removeSpreedlyUserSource,
  retrieveSpreedlyUserSources,
} from "react-app/src/state/ducks/payments/actions";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import { SpreedlyCardForm } from "../spreedly-card-form";
import SpreedlyCustomSourcesV2 from "../spreedly-customer-sources-v.2";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { PaymentMethodFormHeader } from "../form-header-v.2";

declare global {
  interface Window {
    Spreedly: any;
  }
}

interface SpreedlyFormProps {
  onToggle: () => void;
  expanded: boolean;
  index: number;
  contractReference: string;
  discountCouponId: number;
  closePaymentModal: () => void;
}

function SpreedlyFormV2({
  onToggle,
  expanded,
  index,
  contractReference,
  discountCouponId,
  closePaymentModal,
}: SpreedlyFormProps) {
  const [isLoading, setLoading] = useState(true);
  const [userSources, setUserSources] = useState([]);
  const [mode, setMode] = useState<"selectSource" | "addSource">(null);

  const fetchUserSources = useCallback(async () => {
    const response = (await retrieveSpreedlyUserSources()) as {
      cardType: string;
      token: string;
      lastFourDigits: string;
    }[];

    if (Array.isArray(response)) {
      setUserSources(response);
      setMode("selectSource");
    } else {
      setUserSources([]);
      setMode("addSource");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserSources();
  }, []);

  const toggleMode = () => {
    setMode((mode) => (mode === "selectSource" ? "addSource" : "selectSource"));
  };

  const removeSpreedlySource = async (token) => {
    await removeSpreedlyUserSource(token)
      .then(() => {
        fetchUserSources();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;

  return (
    <PaymentMethodFormWrapper>
      <PaymentMethodFormLabel role="button" onToggle={onToggle}>
        <CardIcon className={styles.CardIcon} />
        <span className={styles.LabelSection}>
          <FormattedMessage defaultMessage="Tarjeta de débito o crédito" />
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
        onClose={closePaymentModal}
      >
        <PaymentMethodFormHeader
          title={
            <Maybe
              it={mode === "addSource"}
              orElse={
                <FormattedMessage defaultMessage="SELECCIONA UNA TARJETA" />
              }
            >
              <FormattedMessage defaultMessage="DETALLES DE TU TARJETA" />
            </Maybe>
          }
          closePaymentModal={closePaymentModal}
        />
        <Maybe it={!isLoading} orElse={<LoadingSpinner />}>
          <div className="container py-2">
            <Maybe
              it={userSources.length === 0 || mode === "addSource"}
              orElse={
                <>
                  <SpreedlyCustomSourcesV2
                    sources={userSources}
                    contractReference={contractReference}
                    discountCouponId={discountCouponId}
                    onDeleteSource={(index) => removeSpreedlySource(index)}
                  />
                  <SubmitButton
                    onClick={() => toggleMode()}
                    variant="tertiary"
                    style={{
                      marginTop: "0.8rem",
                    }}
                  >
                    <FormattedMessage defaultMessage="Agregar nueva tarjeta" />
                  </SubmitButton>
                </>
              }
            >
              <SpreedlyCardForm
                contractReference={contractReference}
                discountCouponId={discountCouponId}
              />
              <Maybe it={userSources.length !== 0}>
                <SubmitButton
                  onClick={() => toggleMode()}
                  variant="tertiary"
                  style={{
                    marginTop: "0.8rem",
                  }}
                >
                  <FormattedMessage defaultMessage="Seleccionar una tarjeta" />
                </SubmitButton>
              </Maybe>
            </Maybe>
          </div>
        </Maybe>
      </PaymentMethodFormElement>
    </PaymentMethodFormWrapper>
  );
}

export { SpreedlyFormV2 };
