import {
  CardIcon,
  DotCircle,
  Ellipse,
} from "desktop-app/components/common/icons";
import React, { useCallback, useEffect, useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import {
  removeSource,
  retrieveUserCards,
  togglePaymentInProcess,
} from "react-app/src/state/ducks/payments/actions";
import StripeCardForm from "../stripe-card-form";
import StripeCustomerSources from "../stripe-customer-sources";
import styles from "./styles.module.scss";
import scriptLoader from "react-async-script-loader";
import { StripeProvider, Elements } from "react-stripe-elements";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import useTogglePaymentInProcess from "lib/hooks/useTogglePaymentInProcess";

const scriptSrc = "https://js.stripe.com/v3/";

type StripeFormProps = {
  expanded: boolean;
  index: number;
  contractPrice: number;
  contractReference: string;
  discountCouponId: number | null;
  onToggle: () => void;
  celebrityId: number;
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
};

function StripeForm({
  expanded,
  index,
  onToggle,
  contractReference,
  contractPrice,
  discountCouponId,
  celebrityId,
  isScriptLoaded,
  isScriptLoadSucceed,
}: StripeFormProps) {
  const dispatch = useDispatch();
  const [stripeInstance, setStripeInstance] = useState(null);
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("StripeForm Script loaded");

      setStripeInstance(window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY));
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);
  const [userAvailableSources, setUserAvailableSources] = useState([]);
  const fetchUserCards = useCallback(async () => {
    const response = await retrieveUserCards();
    if (response.availableSources) {
      setUserAvailableSources(response.availableSources);
    }
  }, []);

  useEffect(() => {
    fetchUserCards();
  }, []);
  const [showCardForm, setShowCardForm] = useState(true);
  useEffect(() => {
    setShowCardForm(userAvailableSources.length === 0);
  }, [userAvailableSources]);

  const onDeleteSource = async (index) => {
    await removeSource(userAvailableSources[index].sourceId)
      .then((r) => fetchUserCards())
      .catch((e) => console.log(e));
  };

  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;

  return (
    <StripeProvider stripe={stripeInstance}>
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
          <CardIcon className={styles.CardIcon} />

          <span className={styles.LabelSection}>
            <FormattedMessage defaultMessage="Tarjeta de débito o crédito" />
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
            {showCardForm ? (
              <Elements>
                <StripeCardForm
                  contractPrice={contractPrice}
                  contractReference={contractReference}
                  discountCouponId={discountCouponId}
                  celebrityId={celebrityId}
                />
              </Elements>
            ) : (
              <StripeCustomerSources
                onDeleteSource={onDeleteSource}
                contractPrice={contractPrice}
                contractReference={contractReference}
                discountCouponId={discountCouponId}
                celebrityId={celebrityId}
                availableSources={userAvailableSources}
              />
            )}
            <button
              className={`btn btn-outline ${styles.ChangeDisplayFormBtn}`}
              onClick={() => setShowCardForm((value) => !value)}
            >
              {!showCardForm ? (
                <FormattedMessage defaultMessage="Agregar nueva tarjeta" />
              ) : (
                <FormattedMessage defaultMessage="Seleccionar una tarjeta" />
              )}
            </button>
          </Maybe>
        </div>
      </div>
    </StripeProvider>
  );
}

export default scriptLoader(scriptSrc)(StripeForm);
