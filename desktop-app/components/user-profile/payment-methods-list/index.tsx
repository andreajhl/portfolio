import { IconButton } from "../../common/button/icon-button";
import Maybe from "../../common/helpers/maybe";
import { VisaCardIcon } from "../../common/icons";
import { removeSource } from "react-app/src/state/ducks/payments/actions";
import styles from "./styles.module.scss";

const noResultsMessage = (
  <span className={styles.NoResultsMessage}>
    No posees métodos para mostrar
  </span>
);

function CardBrandIcon({ cardBrand }) {
  return <VisaCardIcon />;
}

type PaymentMethodsListProps = {
  availableSources: any[];
  removeSourceFromList: (cardSourceId: string) => void;
};

function PaymentMethodsList({
  availableSources,
  removeSourceFromList,
}: PaymentMethodsListProps) {
  async function removeCard(cardSourceId: string) {
    try {
      if (!window.confirm("¿Estas seguro?")) return;
      // await removeSource(cardSourceId);
      removeSourceFromList(cardSourceId);
    } catch (error) {}
  }

  return (
    <Maybe it={availableSources.length > 0} orElse={noResultsMessage}>
      {availableSources.map((card) => (
        <div className={styles.PaymentMethodItem}>
          <div className={styles.PaymentMethodBrand}>
            <CardBrandIcon cardBrand={card.typeData.brand} />
          </div>
          <span className={styles.PaymentMethodNumber}>
            **** **** **** {card.typeData.last4}
          </span>
          <IconButton onClick={() => removeCard(card.sourceId)}>
            <i className="far fa-trash-alt" />
          </IconButton>
        </div>
      ))}
    </Maybe>
  );
}

export { PaymentMethodsList };
