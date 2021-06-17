import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { PriceRangeSlider } from "../price-range-slider";
import { useState } from "react";
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

const minPrice = 5;
const maxPrice = 500;

const priceRangeSliderInitialValues = [minPrice, maxPrice];

function SearchFilters({
  updateSearchFilters,
  resetSearchFilters,
  searchFilters,
}: SearchFiltersProps) {
  const [priceRangeValues, setPriceRangeValues] = useState(
    priceRangeSliderInitialValues
  );

  console.log(searchFilters);

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
            min={minPrice}
            max={maxPrice}
            values={priceRangeValues}
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
