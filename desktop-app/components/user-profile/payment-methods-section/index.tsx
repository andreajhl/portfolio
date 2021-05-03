import { useEffect, useState } from "react";
import { retrieveUserCards } from "react-app/src/state/ducks/payments/actions";
import styles from "./styles.module.scss";
import { PaymentMethodsList } from "desktop-app/components/user-profile/payment-methods-list";

type PaymentMethodsSectionProps = {};

function PaymentMethodsSection(props: PaymentMethodsSectionProps) {
  const [availableSources, setAvailableSources] = useState([]);

  useEffect(() => {
    async function getAvailableSources() {
      try {
        const response = await retrieveUserCards();
        setAvailableSources(response.availableSources);
      } catch (error) {}
    }

    getAvailableSources();
  }, []);

  return (
    <section className={styles.PaymentMethodsSection}>
      <h2 className={styles.Title}>Métodos de pago</h2>
      <PaymentMethodsList
        availableSources={availableSources}
        removeSourceFromList={(cardSourceId) =>
          setAvailableSources((availableSources) =>
            availableSources.filter(({ sourceId }) => cardSourceId !== sourceId)
          )
        }
      />
    </section>
  );
}

export { PaymentMethodsSection };
