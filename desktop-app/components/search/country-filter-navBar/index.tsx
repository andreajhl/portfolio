import CheckBoxList from "desktop-app/components/common/checkbox-list";
import React, {
    ReactNode,
  useEffect,
  useState,
} from "react";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { listV2 } from "react-app/src/state/ducks/countries/actions";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage} from "react-intl";
import PaymentMethodFormElement from 'desktop-app/components/payments-methods/form-element';
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import styles from "./styles.module.scss";
import { RootState } from "react-app/src/state/store";


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
  size: 10,
  top: 20,
  transform: "translateZ(-50%)",
  color:'red'
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
    <div className={styles.opcion}>
        <p onClick={()=>toOpen('countrie')} className={styles.opcionTittle}><FormattedMessage defaultMessage= "Paises"/></p>
        <div className={styles.ContainerOpcion} >
        <PaymentMethodFormElement
                labelId={'delivery-countrie-navBar'}
                sectionId={'delivery-countrie-navBar'}
                expanded={isOpen}
        >
            <CardsReelSection
                itemData={arrayCountries}
                itemCount={arrayCountries?.length}
                itemWidth={100}
                itemHeight={30}
                buttonsStyle={buttonStyle}
                gap={20}
            >
                {(e) =><FormattedMessage id={e.label}>{txt => <p onClick={()=>setCountriesChecked(`${e.value}`)}>{txt}</p>}</FormattedMessage>}
            </CardsReelSection>
        </PaymentMethodFormElement>
        </div>
    </div>
  );
}

export {CountryFilterNavBar };
