import PaymentMethodFormElement from 'desktop-app/components/payments-methods/form-element';
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { FormattedMessage } from "lib/custom-intl";
import React, {useEffect,useState} from "react";
import styles from "./styles.module.scss";
import {useDispatch } from "react-redux";

const deliveryTimeFilter = [
  { label: "24hrs", value: "flash" },
  { label:"< 3 días", value: 3 },
  { label: "< 5 días", value: 5 },
  { label: "7 días", value: 7 }
];

const buttonStyle = {
    size: 20,
    top: 20,
    opacity:1,
    transform: "translateY(-50%)",
};

type timeFilterProps={
  isOpen:boolean,
  toOpen: (value:string)=> void
}

function DeliveryTimeFilterNavbar({isOpen, toOpen}:timeFilterProps) {
    
    const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState();
    
    const dispatch = useDispatch()

  useEffect(() => {
    if (deliveriesTimeChecked) {
      dispatch(updateSearchFilters({max_delivery_time: deliveriesTimeChecked}))
    }
  }, [deliveriesTimeChecked]);

  return (
    <div className={styles.opcion}>
        <p className={styles.opcionTittle} onClick={()=>toOpen('time')}><FormattedMessage defaultMessage= "Tiempo de entrega"/></p>
        <div className={styles.ContainerOpcion} >
        <PaymentMethodFormElement
                labelId={'delivery-time-navBar'}
                sectionId={'delivery-time-navBar'}
                expanded={isOpen}
        >
            <CardsReelSection
                itemData={deliveryTimeFilter}
                itemCount={deliveryTimeFilter?.length}
                itemWidth={100}
                itemHeight={40}
                buttonsStyle={buttonStyle}
                gap={20}
            >
                {(e) =><FormattedMessage id={e.label}>{txt => <p onClick={()=>setDeliveriesTimeChecked(e.value)}>{txt}</p>}</FormattedMessage>}
            </CardsReelSection>
        </PaymentMethodFormElement>
        </div>
    </div>
  );
}


export {DeliveryTimeFilterNavbar };
