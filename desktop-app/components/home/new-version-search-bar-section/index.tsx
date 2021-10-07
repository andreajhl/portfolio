import { DeliveryTimeFilterNavbar} from 'desktop-app/components/search/delivery-time-filter-navBar';
import {CategorieFilterCarrousel} from 'desktop-app/components/search/categories-filter-carousel';
import {ExtraPrudctFilterNavBar} from 'desktop-app/components/search/filter-extra-products';
import {CountryFilterNavBar } from 'desktop-app/components/search/country-filter-navBar';
import {PriceRangeNavBar} from 'desktop-app/components/search/filter-price-range-navbar';
import {FilterRatingNavbar} from 'desktop-app/components/search/filter-rating '
import styles from "./styles.module.scss";
import { useState } from "react";

function SearchBarSectionV2() {
 
  const [Open, setOpen] = useState({
    time:false,
    countrie:false,
    price: false,
    extraProduct: false,
    rating:false
  });

  function toOpen(name:string) {
    setOpen({
      time:false,
      countrie:false,
      price:false,
      extraProduct: false,
      rating:false,
      [name]:true
    });
  };
  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchBarContainer_div}>
        <CategorieFilterCarrousel
          itemWidth={270}
          itemHeight={150}
          gap={20}
        />
        <div className={styles.SearchBarOpcion}>
          <FilterRatingNavbar isOpen={Open.rating} toOpen={toOpen}/>
          <PriceRangeNavBar isOpen={Open.price} toOpen={toOpen}/>
          <CountryFilterNavBar isOpen={Open.countrie} toOpen={toOpen}/>
          <ExtraPrudctFilterNavBar isOpen={Open.extraProduct} toOpen={toOpen}/>
          <DeliveryTimeFilterNavbar isOpen={Open.time} toOpen={toOpen}/>
        </div>        
      </div>
    </div>
  );
}

export default SearchBarSectionV2;
