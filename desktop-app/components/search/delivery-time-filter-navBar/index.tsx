import PaymentMethodFormElement from "desktop-app/components/payments-methods/form-element";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { defineMessages, useIntl } from "react-intl";
import { FormattedMessage } from "lib/custom-intl";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import Reel from "desktop-app/components/layouts/reel";

const messages = defineMessages({
  flash: {
    defaultMessage: "24hrs",
  },
  days3: {
    defaultMessage: "< 3 días",
  },
  days5: {
    defaultMessage: "< 5 días",
  },
  days7: {
    defaultMessage: "7 días",
  },
});

const buttonStyle = {
  size: 25,
  top: 15,
  opacity: 0.6,
  transform: "translateY(-50%)",
};

type timeFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
};

function DeliveryTimeFilterNavbar({ isOpen, onToggle }: timeFilterProps) {
  const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveriesTimeChecked) {
      dispatch(
        updateSearchFilters({ max_delivery_time: deliveriesTimeChecked })
      );
    }
  }, [deliveriesTimeChecked]);

  const deliveryTimeFilter = [
    { label: formatMessage(messages.flash), value: "flash" },
    { label: formatMessage(messages.days3), value: 3 },
    { label: formatMessage(messages.days5), value: 5 },
    { label: formatMessage(messages.days7), value: 7 },
  ];

  return (
    <div className={styles.option}>
      <span className={styles.optionTittle} onClick={() => onToggle()}>
        <FormattedMessage defaultMessage="Tiempo de entrega" />
      </span>
      {isOpen && (
        <div className={styles.ContainerOption}>
          <Reel
            itemSize={180}
            height={35}
            scrollByOffset={10}
            itemCount={deliveryTimeFilter.length}
            buttonsStyle={buttonStyle}
            itemData={deliveryTimeFilter}
          >
            {({ data, index, style }) => {
              const hashtag = data[index].label;
              const value = data[index].value;
              return (
                <div
                  style={{ ...style, left: Number(style.left) + 10 * index }}
                >
                  <span
                    className={styles.BadgeStyle}
                    onClick={() => setDeliveriesTimeChecked(value)}
                  >
                    {hashtag}
                  </span>
                </div>
              );
            }}
          </Reel>
        </div>
      )}
    </div>
  );
}

export { DeliveryTimeFilterNavbar };
