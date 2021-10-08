import { DeliveryTimeFilterNavbar} from 'desktop-app/components/search/delivery-time-filter-navBar';
import {CategorieFilterCarrousel} from 'desktop-app/components/search/categories-filter-carrousel';
import {ExtraProductFilterNavBar} from 'desktop-app/components/search/filter-extra-products';
import {CountryFilterNavBar } from 'desktop-app/components/search/country-filter-navBar';
import {PriceRangeNavBar} from 'desktop-app/components/search/filter-price-range-navbar';
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import {FilterRatingNavbar} from 'desktop-app/components/search/filter-rating '
import { useState,useEffect } from "react";
import styles from "./styles.module.scss";

function NewSearchBarSection() {
 
  const [width,setwidth]=useState(185);
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

  useEffect(() => {
    if(Object.entries(Open).flat(Infinity).includes(true)) setwidth(400)
  }, [Open])

  const filtros=[<CountryFilterNavBar isOpen={Open.countrie} toOpen={toOpen}/>,<FilterRatingNavbar isOpen={Open.rating} toOpen={toOpen}/>,<PriceRangeNavBar isOpen={Open.price} toOpen={toOpen}/>,<ExtraProductFilterNavBar isOpen={Open.extraProduct} toOpen={toOpen}/>,<DeliveryTimeFilterNavbar isOpen={Open.time} toOpen={toOpen}/>]
  
  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchBarContainer_div}>
        <CategorieFilterCarrousel
          itemWidth={270}
          itemHeight={150}
          gap={20}
        />
        <CardsReelSection
            itemData={filtros}
            itemCount={filtros?.length}
            itemWidth={width}
            itemHeight={80}
            gap={30}
          >
            {(e)=><div className={styles.SearchBarCarrousel}>{e}</div>}
          </CardsReelSection>
      </div>
    </div>
  );
}

export default NewSearchBarSection;
