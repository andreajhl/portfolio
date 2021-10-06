import PaymentMethodFormElement from 'desktop-app/components/payments-methods/form-element';
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { listV2 } from "react-app/src/state/ducks/countries/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import React, {useEffect, useState,} from "react";
import { FormattedMessage} from "react-intl";
import styles from "./styles.module.scss";


const generateKeysValue = (array) => {
  let arrayCountries=array.map((e) => ({label:e.name,value:e.id}));
  return arrayCountries;
};

type timeFilterProps={
  isOpen:boolean,
  toOpen: (value:string)=> void
}

const countries = ({ countries}:RootState) =>  countries.countriesReducer.data.results

const buttonStyle = {
  size: 25,
  top: 15,
  opacity:0.6,
  transform: "translateY(-50%)"
};

function CountryFilterNavBar({isOpen, toOpen}:timeFilterProps) {

  const dispatch = useDispatch();
  const countriesState= useSelector(countries);
  const arrayCountries=generateKeysValue(countriesState);
  const [countriesChecked, setCountriesChecked] = useState('');

  useEffect(() => {
    dispatch(listV2({ orderBy: "name asc" }));
  }, [dispatch]);
  useEffect(() => {
    if(countriesChecked.length>0) dispatch(updateSearchFilters({country_id: countriesChecked}))
  }, [dispatch,countriesChecked])


  return (
    <div className={styles.option}>
        <p onClick={()=>toOpen('countrie')} className={styles.optionTittle}><FormattedMessage defaultMessage= "Paises"/></p>
        <div className={styles.ContainerOption}>
        <PaymentMethodFormElement
                labelId={'delivery-countrie-navBar'}
                sectionId={'delivery-countrie-navBar'}
                expanded={isOpen}
        >
            <CardsReelSection
                itemData={arrayCountries}
                itemCount={arrayCountries?.length}
                itemWidth={100}
                itemHeight={35}
                buttonsStyle={buttonStyle}
                gap={10}
            >
                {(e) =><FormattedMessage id={e.label}>{txt => <p onClick={()=>setCountriesChecked(`${e.value}`)}>{txt}</p>}</FormattedMessage>}
            </CardsReelSection>    
          </PaymentMethodFormElement>
        </div>
    </div>
  );
}

export {CountryFilterNavBar };
