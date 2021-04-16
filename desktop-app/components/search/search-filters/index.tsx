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

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

function SearchFilters({ ...props }: SearchFiltersProps) {
  const [values, setValues] = useState<[number, number]>([5, 500]);
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

  const [min, max] = values;

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

  return (
    <div className={styles.SearchFilters}>
      <CheckBoxList
        title="Paises"
        options={memoizedValuesForCountries}
        handleChange={(event) =>
          handleChangeCheckbox(event, setCountriesChecked)
        }
      />
      <hr></hr>
      <CheckBoxList
        title="Categoria"
        options={memoizedValueForCategoryFilters}
        handleChange={(event) =>
          handleChangeCheckbox(event, setCategoriesChecked)
        }
      />
      <hr></hr>
      <label>Precio</label>
      <br />
      <PriceRangeSlider
        min={5}
        max={500}
        values={values}
        onValuesUpdated={({ values }) => {
          setValues(values);
        }}
      />
      <hr></hr>

      <CheckBoxList
        title="Tiempo de entrega"
        options={memoizedValuesForDeliveryTimeFilter}
        handleChange={(event) =>
          handleChangeCheckbox(event, setDeliveriesTimeChecked)
        }
      />
      <hr></hr>
      <button
        type="button"
        className={`btn btn-tertiary ${styles.SearchFiltersButton}`}
        onClick={resetFilters}
      >
        Limpiar filtros
      </button>
    </div>
  );
}

const _SearchFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilters);

export { _SearchFilters as SearchFilters };
