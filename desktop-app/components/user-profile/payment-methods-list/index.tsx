import { IconButton } from "../../common/button/icon-button";
import { VisaCardIcon } from "../../common/icons";
import { removeSource } from "react-app/src/state/ducks/payments/actions";
import { ItemSkeleton } from "./skeleton";
import styles from "./styles.module.scss";

function CardBrandIcon({ cardBrand }) {
  return <VisaCardIcon />;
}

const noResultMessage = (
  <span className={styles.NoResultsMessage}>
    Aún no tienes ningún método de pago registrado.
  </span>
);

type PaymentMethodsListProps = {
  isLoading: boolean;
  availableSources: any[];
  removeSourceFromList: (cardSourceId: string) => void;
};

function PaymentMethodsList({
  isLoading,
  availableSources,
  removeSourceFromList,
}: PaymentMethodsListProps) {
  if (isLoading) {
    return (
      <div className={styles.PaymentMethodsList}>
        <ItemSkeleton />
        <ItemSkeleton />
      </div>
    );
  }

  if (!Array.isArray(availableSources) || availableSources.length === 0) {
    return noResultMessage;
  }

  async function removeCard(cardSourceId: string) {
    try {
      if (!window?.confirm?.("¿Estas seguro?")) return;
      await removeSource(cardSourceId);
      removeSourceFromList(cardSourceId);
    } catch (error) {}
  }

  return (
    <div className={styles.PaymentMethodsList}>
      {availableSources.map((card) => (
        <div className={styles.PaymentMethodItem} key={card.sourceId}>
          <div className={styles.PaymentMethodBrand}>
            <CardBrandIcon cardBrand={card.typeData.brand} />
          </div>
          <span className={styles.PaymentMethodNumber}>
            **********{card.typeData.last4}
          </span>
          <IconButton onClick={() => removeCard(card.sourceId)}>
            <i className="far fa-trash-alt" />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export { PaymentMethodsList };
