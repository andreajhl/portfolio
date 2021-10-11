import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { PriceRangeSliderNavBar } from "desktop-app/components/search/price-range-slider-navBar";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "lib/custom-intl";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const defaultMinPrice = 5;
const defaultMaxPrice = 500;
const priceRangeSliderInitialValues = [defaultMinPrice, defaultMaxPrice];

const searchFilter = ({ searchFilters }) => searchFilters;

type timeFilterProps = {
  isOpen: boolean;
  toOpen: (value: string) => void;
};

export const PriceRangeNavBar = ({ isOpen, toOpen }: timeFilterProps) => {
  const dispatch = useDispatch();
  const searchFilters = useSelector(searchFilter);
  const { min_price, max_price } = searchFilters;
  const [priceRangeIsTouched, setPriceRangeIsTouched] = useState(false);
  const [priceRangeValues, setPriceRangeValues] = useState(
    priceRangeSliderInitialValues
  );

  function changeIsTouched() {
    if (!priceRangeIsTouched) setPriceRangeIsTouched(true);
  }

  useEffect(() => {
    if (!min_price || !max_price) return;
    changeIsTouched();
    const minPrice = Number(min_price) ?? defaultMinPrice;
    const maxPrice = Number(max_price) ?? defaultMaxPrice;
    setPriceRangeValues([minPrice, maxPrice]);
  }, [min_price, max_price]);

  function updateSearchFilterPriceRange({
    values: [min_price, max_price],
  }: {
    values: [any, any];
  }): void {
    if (
      max_price !== priceRangeSliderInitialValues[1] &&
      min_price !== priceRangeSliderInitialValues
    ) {
      dispatch(updateSearchFilters({ min_price, max_price }));
    }
  }

  return (
    <div className={styles.option}>
      <span className={styles.optionTittle} onClick={() => toOpen("price")}>
        <FormattedMessage defaultMessage="Precios" />
      </span>
      {isOpen && (
        <div className={styles.ContainerOption}>
          <PriceRangeSliderNavBar
            min={defaultMinPrice}
            max={defaultMaxPrice}
            values={priceRangeValues}
            isTouched={priceRangeIsTouched}
            changeIsTouched={changeIsTouched}
            setValues={setPriceRangeValues}
            onChange={updateSearchFilterPriceRange}
          />
        </div>
      )}
    </div>
  );
};
