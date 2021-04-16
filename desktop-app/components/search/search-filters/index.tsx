import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { PriceRangeSlider } from "../price-range-slider";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import CheckBoxList from "desktop-app/components/common/checkbox-list";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { searchFiltersInitialState } from "react-app/src/state/ducks/search-filters/reducers";
import { countriesOperations } from "react-app/src/state/ducks/countries";
import { celebrityCategoriesOperations } from "react-app/src/state/ducks/celebrity-categories";

const mapStateToProps = ({ countries, searchFilters, celebrityCategories }) => {
  return {
    countries: countries.countriesReducer.data.results,
    celebrityCategories:
      celebrityCategories.fetchCelebrityCategoriesReducer.data.results,
    updateSearchFilters,
    searchFilters
  };
};

const mapDispatchToProps = {
  listCountries: countriesOperations.list,
  listCelebrityCategories: celebrityCategoriesOperations.list
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
  listCountries,
  listCelebrityCategories,
  searchFilters
}: SearchFiltersProps) {
  useEffect(() => {
    const shouldFetchFilterOptions =
      !countries.length && !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCountries({ orderBy: "name asc" });
    listCelebrityCategories({ orderBy: "title asc" });
  }, []);
  console.log(celebrityCategories);
  const [values, setValues] = useState<[number, number]>([5, 500]);

  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState([
    { label: "Flash (24hrs)", value: "flash" },
    { label: "1-2 dias", value: "1-2 dias" },
    { label: "3-4 dias", value: "3-4 dias" },
    { label: "5-7 dias", value: "5-7 dias" }
  ]);
  const [countriesChecked, setCountriesChecked] = useState(new Map());
  const [categoriesChecked, setCategoriesChecked] = useState(new Map());
  const [deliveriesTimeChecked, setDeliveriesTimeChecked] = useState(new Map());

  const resetFilters = () => {
    setCountriesChecked(new Map());
    setCategoriesChecked(new Map());
    setDeliveriesTimeChecked(new Map());
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

  const memoizedValuesForCountries = useMemo(
    () =>
      countries.map((country, index) => ({
        label: country.name,
        value: country.id,
        name: country.name + index,
        checked: countriesChecked.get(country.name + index)
      })),
    [countriesChecked, countries]
  );

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
          <CheckBoxList
            title="Paises"
            options={memoizedValuesForCountries}
            handleChange={(event) =>
              handleChangeCheckbox(event, setCountriesChecked)
            }
          />
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
