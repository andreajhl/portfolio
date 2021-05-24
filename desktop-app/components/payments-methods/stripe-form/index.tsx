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
} from "react-app/src/state/ducks/payments/actions";
import StripeCardForm from "../stripe-card-form";
import StripeCustomerSources from "../stripe-customer-sources";
import styles from "./styles.module.scss";

type StripeFormProps = {
  expanded: boolean;
  index: number;
  contractPrice: number;
  contractReference: string;
  discountCouponId: string;
  onToggle: () => void;
};

function StripeForm({
  expanded,
  index,
  onToggle,
  contractReference,
  contractPrice,
  discountCouponId,
}: StripeFormProps) {
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

        <span className={styles.LabelSection}>Tarjeta de débito o crédito</span>
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
            <StripeCardForm
              contractPrice={contractPrice}
              contractReference={contractReference}
              discountCouponId={discountCouponId}
            />
          ) : (
            <StripeCustomerSources
              onDeleteSource={onDeleteSource}
              contractPrice={contractPrice}
              contractReference={contractReference}
              discountCouponId={discountCouponId}
              celebrityId={"2"}
              availableSources={userAvailableSources}
            />
          )}
          <button
            className={`btn btn-outline ${styles.ChangeDisplayFormBtn}`}
            onClick={() => setShowCardForm((value) => !value)}
          >
            {!showCardForm
              ? "Agregar nueva tarjeta"
              : "Seleccionar una tarjeta"}
          </button>
        </Maybe>
      </div>
    </div>
  );
}

export default StripeForm;
