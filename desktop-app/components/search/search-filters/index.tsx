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
import { countriesOperations } from "react-app/src/state/ducks/countries";
import { celebrityCategoriesOperations } from "react-app/src/state/ducks/celebrity-categories";
import { CountryFilter } from "../country-filter";

const mapStateToProps = ({ countries, searchFilters, celebrityCategories }) => {
  return {
    countries: countries.countriesReducer.data.results,
    celebrityCategories:
      celebrityCategories.fetchCelebrityCategoriesReducer.data.results,
    searchFilters
  };
};

const mapDispatchToProps = {
  listCountries: countriesOperations.list,
  listCelebrityCategories: celebrityCategoriesOperations.list,
  updateSearchFilters,
  resetSearchFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

const minPrice = searchFiltersInitialState.price_gt;
const maxPrice = searchFiltersInitialState.price_lt;

function SearchFilters({
  countries,
  updateSearchFilters,
  celebrityCategories,
  resetSearchFilters,
  listCountries,
  listCelebrityCategories,
  searchFilters
}: SearchFiltersProps) {
  useEffect(() => {
    const shouldFetchFilterOptions = !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCelebrityCategories({ orderBy: "title asc" });
  }, []);

  const [values, setValues] = useState<[number, number]>([5, 500]);
  console.log(searchFilters);
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState([
    { label: "Flash (24hrs)", value: "flash" },
    { label: "1-2 dias", value: "1-2 dias" },
    { label: "3-4 dias", value: "3-4 dias" },
    { label: "5-7 dias", value: "5-7 dias" }
  ]);
  const [categoriesChecked, setCategoriesChecked] = useState(new Map());
  const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState(new Map());

  const resetFilters = () => {
    resetSearchFilters();
  };

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<Map<any, any>>>
  ) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    setter(
      (prevState) =>
        new Map([...Array.from(prevState.entries()), [item, isChecked]])
    );
  };

  const memoizedValueForCategoryFilters = useMemo(
    () =>
      celebrityCategories.map((category, index) => ({
        label: category.title,
        value: category.id,
        name: category.title + index,
        checked: categoriesChecked.get(category.title + index)
      })),
    [celebrityCategories, categoriesChecked]
  );

  const memoizedValuesForDeliveryTimeFilter = useMemo(
    () =>
      deliveryTimeFilter.map((time, index) => ({
        ...time,
        name: time.label + index,
        checked: deliveriesTimeChecked.get(time.label + index)
      })),
    [deliveryTimeFilter, deliveriesTimeChecked]
  );

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
          <CheckBoxList
            title="Categoria"
            options={memoizedValueForCategoryFilters}
            handleChange={(event) =>
              handleChangeCheckbox(event, setCategoriesChecked)
            }
          />
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
          <CheckBoxList
            title="Tiempo de entrega"
            options={memoizedValuesForDeliveryTimeFilter}
            handleChange={(event) =>
              handleChangeCheckbox(event, setDeliveriesTimeChecked)
            }
          />
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
