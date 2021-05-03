import { useEffect, useState } from "react";
import { retrieveUserCards } from "react-app/src/state/ducks/payments/actions";
import styles from "./styles.module.scss";
import { PaymentMethodsList } from "desktop-app/components/user-profile/payment-methods-list";
import { SkeletonText } from "../../common/helpers/skeleton-text";

type PaymentMethodsSectionProps = {};

function PaymentMethodsSection(props: PaymentMethodsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableSources, setAvailableSources] = useState([]);

  useEffect(() => {
    async function getAvailableSources() {
      try {
        const response = await retrieveUserCards();
        setAvailableSources(response.availableSources);
        setIsLoading(false);
      } catch (error) {}
    }

    getAvailableSources();
  }, []);

  return (
    <section className={styles.PaymentMethodsSection}>
      <h2 className={styles.Title}>
        <SkeletonText isLoading={isLoading}>Métodos de pago</SkeletonText>
      </h2>
      <PaymentMethodsList
        isLoading={isLoading}
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
