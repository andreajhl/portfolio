import { useEffect, useState } from "react";
import { retrieveUserCards } from "react-app/src/state/ducks/payments/actions";
import { PaymentMethodsList } from "desktop-app/components/user-profile/payment-methods-list";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";

type PaymentMethodsSectionProps = {};

function PaymentMethodsSection(props: PaymentMethodsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableSources, setAvailableSources] = useState([]);

  useEffect(() => {
    async function getAvailableSources() {
      try {
        const response = await retrieveUserCards();
        setIsLoading(false);
        if (!Array.isArray(response.availableSources)) return;
        setAvailableSources(response.availableSources);
      } catch (error) {}
    }

    getAvailableSources();
  }, []);

  const hasResults = !isLoading && availableSources.length > 0;

  return (
    <section className={styles.PaymentMethodsSection}>
      <h2
        className={classes(styles.Title, !hasResults && styles.NoResultsTitle)}
      >
        <FormattedMessage defaultMessage="Métodos de pago" />
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
