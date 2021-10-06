import { DeliveryTimeFilterNavbar} from 'desktop-app/components/search/delivery-time-filter-navBar';
import {CountryFilterNavBar } from 'desktop-app/components/search/country-filter-navBar';
import {PriceRangeNavBar} from 'desktop-app/components/search/filter-price-range-navbar';
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { analytics } from "react-app/src/state/utils/gtm";
import { getSearchKeywordPath } from "constants/paths";
import {categories} from 'constants/categories.js';
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import {useEffect} from 'react';

const buttonStyle = {
  size: 40,
  top: 70,
  opacity:0.6,
  transform: "translateY(-50%)"
};

function SearchBarSectionV2() {

  const router= useRouter();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue) return;
    analytics.track("HOME_SEARCH_BAR_SUBMIT", {
      searchKeyword: inputValue,
      widget: "SearchBarSection",
    });
    router.push(getSearchKeywordPath(inputValue));
  }, [inputValue,router]);
 
  const [Open, setOpen] = useState({
    time:false,
    countrie:false,
    price: false
  });

  function toOpen(name:string) {
    setOpen({
      time:false,
      countrie:false,
      price:false,
      [name]:true
    });
  };

  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchBarContainer_div}>
        <CardsReelSection
          itemData={categories}
          itemCount={categories?.length}
          itemWidth={212}
          itemHeight={170}
          buttonsStyle={buttonStyle}
          gap={20}
        >
          {(e) => (
              <div onClick={()=>setInputValue(e.keywords[0])} className={styles.SearchBarContainer_Img}>
                <img src={e.image} alt={e.tittle}/>
              </div>
            )}
        </CardsReelSection>
        <div className={styles.SearchBarOpcion}>
        <CountryFilterNavBar isOpen={Open.countrie} toOpen={toOpen}/>
          <DeliveryTimeFilterNavbar isOpen={Open.time} toOpen={toOpen}/>
          <PriceRangeNavBar isOpen={Open.price} toOpen={toOpen}/>
        </div>        
      </div>
    </div>
  );
}

export default SearchBarSectionV2;
