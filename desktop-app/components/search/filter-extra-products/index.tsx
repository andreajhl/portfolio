import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import PaymentMethodFormElement from "desktop-app/components/payments-methods/form-element";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { defineMessages, useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

const messages = defineMessages({
  flash: {
    defaultMessage: "Entrega flash",
  },
  disfrazados: {
    defaultMessage: "Disfrazados",
  },
  props: {
    defaultMessage: "Props",
  },
});

type timeFilterProps = {
  isOpen: boolean;
  toOpen: (value: string) => void;
};

const buttonStyle = {
  size: 25,
  top: 15,
  opacity: 0.6,
  transform: "translateY(-50%)",
};

function ExtraProductFilterNavBar({ isOpen, toOpen }: timeFilterProps) {
  const { formatMessage } = useIntl();

  const [countriesChecked, setCountriesChecked] = useState("");

  const arrayProduct = [
    { label: formatMessage(messages.flash), value: "Entrega flash" },
    { label: formatMessage(messages.disfrazados), value: "Disfrazados" },
    { label: formatMessage(messages.props), value: "Props" },
  ];

  return (
    <div className={styles.option}>
      <p onClick={() => toOpen("extraProduct")} className={styles.optionTittle}>
        <FormattedMessage defaultMessage="Servicios Extras" />
      </p>
      <div className={styles.ContainerOption}>
        <PaymentMethodFormElement
          labelId={"delivery-extraService-navBar"}
          sectionId={"delivery-extraService-navBar"}
          expanded={isOpen}
        >
          <CardsReelSection
            itemData={arrayProduct}
            itemCount={arrayProduct?.length}
            itemWidth={120}
            itemHeight={35}
            buttonsStyle={buttonStyle}
            gap={10}
          >
            {(e) => (
              <p onClick={() => setCountriesChecked(e.value)}>{e.label}</p>
            )}
          </CardsReelSection>
        </PaymentMethodFormElement>
      </div>
    </div>
  );
}

export { ExtraProductFilterNavBar };
