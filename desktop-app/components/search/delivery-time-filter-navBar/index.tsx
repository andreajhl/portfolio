import PaymentMethodFormElement from 'desktop-app/components/payments-methods/form-element';
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { defineMessages, useIntl } from "react-intl";
import { FormattedMessage } from "lib/custom-intl";
import React, {useEffect,useState} from "react";
import styles from "./styles.module.scss";
import {useDispatch } from "react-redux";

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
    }
});

const buttonStyle = {
  size: 25,
  top: 15,
  opacity:0.6,
  transform: "translateY(-50%)",
};

type timeFilterProps={
  isOpen:boolean,
  toOpen: (value:string)=> void
}

function DeliveryTimeFilterNavbar({isOpen, toOpen}:timeFilterProps) {
    
    const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState();
    const { formatMessage } = useIntl();
    const dispatch = useDispatch()

  useEffect(() => {
    if (deliveriesTimeChecked) {
      dispatch(updateSearchFilters({max_delivery_time: deliveriesTimeChecked}))
    }
  }, [deliveriesTimeChecked]);

  const deliveryTimeFilter = [
    { label: formatMessage(messages.flash), value: "flash" },
    { label:formatMessage(messages.days3), value: 3 },
    { label:formatMessage(messages.days5), value: 5 },
    { label: formatMessage(messages.days7), value: 7 }
  ];

  return (
    <div className={styles.option}>
        <p className={styles.optionTittle} onClick={()=>toOpen('time')}><FormattedMessage defaultMessage= "Tiempo de entrega"/></p>
        <div className={styles.ContainerOption} >
        <PaymentMethodFormElement
                labelId={'delivery-time-navBar'}
                sectionId={'delivery-time-navBar'}
                expanded={isOpen}
        >
            <CardsReelSection
                itemData={deliveryTimeFilter}
                itemCount={deliveryTimeFilter?.length}
                itemWidth={100}
                itemHeight={35}
                buttonsStyle={buttonStyle}
                gap={10}
            >
                {(e) =><p onClick={()=>setDeliveriesTimeChecked(e.value)}>{e.label}</p>}
            </CardsReelSection>
        </PaymentMethodFormElement>
        </div>
    </div>
  );
}


export {DeliveryTimeFilterNavbar };
