import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { PriceRangeSlider } from "../price-range-slider";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import CheckBoxList from "desktop-app/components/common/checkbox-list";
import {
  updateSearchFilters,
  resetSearchFilters
} from "react-app/src/state/ducks/search-filters/actions";
import { searchFiltersInitialState } from "react-app/src/state/ducks/search-filters/reducers";
import { CountryFilter } from "../country-filter";
import { CategoryFilter } from "../category-filter";
import { DeliveryTimeFilter } from "../delivery-time-filter";

const mapStateToProps = ({ searchFilters }) => {
  return {
    searchFilters
  };
};

const mapDispatchToProps = {
  updateSearchFilters,
  resetSearchFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

const minPrice = searchFiltersInitialState.price_gt;
const maxPrice = searchFiltersInitialState.price_lt;

function SearchFilters({
  updateSearchFilters,
  resetSearchFilters,
  searchFilters
}: SearchFiltersProps) {
  const [values, setValues] = useState<[number, number]>([5, 500]);
  const resetFilters = () => {
    resetSearchFilters();
  };

  const priceRangeSliderValues = [
    searchFilters.price_gt,
    searchFilters.price_lt
  ];

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
            initialValues={priceRangeSliderValues}
            onChange={({ values: [price_gt, price_lt] }) => {
              updateSearchFilters({
                price_gt,
                price_lt
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
          <button
            type="button"
            className={`btn btn-tertiary ${styles.SearchFiltersButton}`}
            onClick={resetFilters}
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
