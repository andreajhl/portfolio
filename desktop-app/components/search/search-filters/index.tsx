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

const mapStateToProps = ({ searchFilters }) => ({ searchFilters });

const mapDispatchToProps = {
  updateSearchFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

const minPrice = searchFiltersInitialState.price_gt;
const maxPrice = searchFiltersInitialState.price_lt;

function SearchFilters({
  updateSearchFilters,
  searchFilters
}: SearchFiltersProps) {
  console.log(searchFilters);
  const [countryFilters, setCountryFilters] = useState([
    { label: "Argentina", value: "Argentina" },
    { label: "Venezuela", value: "Venezuela" },
    { label: "Peru", value: "Peru" },
    { label: "Chile", value: "Chile" },
    { label: "Colombia", value: "Colombia" },
    { label: "Mexico", value: "Mexico" },
    { label: "Estados unidos", value: "Estados unidos" },
    { label: "China", value: "China" },
    { label: "Japon", value: "Japon" }
  ]);
  const [categoryFilters, setCategoryFilters] = useState([
    { label: "Actores", value: "Actores" },
    { label: "Adultos", value: "Adultos" },
    { label: "Bailarines", value: "Bailarines" },
    { label: "Chef", value: "Chef" },
    { label: "Coach", value: "Coach" },
    { label: "Comediantes", value: "Comediantes" },
    { label: "Doblaje", value: "Doblaje" },
    { label: "Fitness", value: "Fitness" },
    { label: "Imitadores", value: "Imitadores" },
    { label: "Influencers", value: "Influencers" },
    { label: "Modelos", value: "Modelos" },
    { label: "Periodistas", value: "Periodistas" }
  ]);
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
      countryFilters.map((country, index) => ({
        ...country,
        name: country.label + index,
        checked: countriesChecked.get(country.label + index)
      })),
    [countriesChecked, countryFilters]
  );

  const memoizedValueForCategoryFilters = useMemo(
    () =>
      categoryFilters.map((category, index) => ({
        ...category,
        name: category.label + index,
        checked: categoriesChecked.get(category.label + index)
      })),
    [categoryFilters, categoriesChecked]
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
