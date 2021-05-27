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
  const [values, setValues] = useState(priceRangeSliderInitialValues);
  console.log(searchFilters);

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
            values={values}
            setValues={setValues}
            onChange={({ values: [price_gt, price_lt] }) => {
              updateSearchFilters({
                price_gt,
                price_lt,
              });
            }}
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
            onChangeHashtags={(hashtags) =>
              updateSearchFilters({
                hashtags: hashtags.join(","),
              })
            }
            className={styles.SearchFiltersHashtagsFilter}
            searchFilters={searchFilters}
          />
          <button
            type="button"
            className={`btn btn-tertiary ${styles.SearchFiltersButton}`}
            onClick={() => {
              resetSearchFilters();
              setValues(priceRangeSliderInitialValues);
            }}
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
