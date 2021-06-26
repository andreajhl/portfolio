import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { PriceRangeSlider } from "../price-range-slider";
import { useEffect, useState } from "react";
import {
  updateSearchFilters,
  resetSearchFilters,
} from "react-app/src/state/ducks/search-filters/actions";
import { CountryFilter } from "../country-filter";
import { CategoryFilter } from "../category-filter";
import { DeliveryTimeFilter } from "../delivery-time-filter";
import { HashtagsFilter } from "desktop-app/components/search/hashtags-filter";
import { RootState } from "react-app/src/state/store";

const mapStateToProps = ({ searchFilters }: RootState) => {
  return {
    searchFilters,
  };
};

const mapDispatchToProps = {
  updateSearchFilters,
  resetSearchFilters,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

const defaultMinPrice = 5;
const defaultMaxPrice = 500;

const priceRangeSliderInitialValues = [defaultMinPrice, defaultMaxPrice];

function SearchFilters({
  updateSearchFilters,
  resetSearchFilters,
  searchFilters,
}: SearchFiltersProps) {
  const [priceRangeValues, setPriceRangeValues] = useState(
    priceRangeSliderInitialValues
  );
  const [priceRangeIsTouched, setPriceRangeIsTouched] = useState(false);

  function changeIsTouched() {
    if (!priceRangeIsTouched) setPriceRangeIsTouched(true);
  }

  const { min_price, max_price } = searchFilters;

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
    updateSearchFilters({
      min_price,
      max_price,
    });
  }

  function updateSearchFilterHashtags(hashtags: string[]): void {
    updateSearchFilters({
      hashtags: hashtags.join(","),
    });
  }

  function cleanSearchFilters() {
    resetSearchFilters();
    setPriceRangeValues(priceRangeSliderInitialValues);
  }

  return (
    <div className={styles.SearchFilters}>
      <div className={styles.SearchFilterRow}>
        <div className={styles.SearchFilterItem}>
          <CountryFilter />
        </div>
      </div>
      <div className={styles.SearchFilterRow}>
        <div className={styles.SearchFilterItem}>
          <CategoryFilter />
        </div>
      </div>
      <div className={styles.SearchFilterRow}>
        <div className={styles.SearchFilterItem}>
          <label className={styles.SearchFilterItemTitle}>Precio</label>
          <PriceRangeSlider
            min={defaultMinPrice}
            max={defaultMaxPrice}
            values={priceRangeValues}
            isTouched={priceRangeIsTouched}
            changeIsTouched={changeIsTouched}
            setValues={setPriceRangeValues}
            onChange={updateSearchFilterPriceRange}
          />
        </div>
      </div>
      <div className={styles.SearchFilterRow}>
        <div className={styles.SearchFilterItem}>
          <DeliveryTimeFilter />
        </div>
      </div>
      <div className={styles.SearchFilterRow}>
        <div className={styles.SearchFilterItem}>
          <HashtagsFilter
            onChangeHashtags={updateSearchFilterHashtags}
            className={styles.SearchFiltersHashtagsFilter}
            searchFilters={searchFilters}
          />
          <button
            type="button"
            className={`btn btn-tertiary ${styles.SearchFiltersButton}`}
            onClick={cleanSearchFilters}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}

const _SearchFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilters);

export { _SearchFilters as SearchFilters };
