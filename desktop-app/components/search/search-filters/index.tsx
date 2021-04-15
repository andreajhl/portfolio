import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { RangeSlider } from "desktop-app/components/range-slider";
import CheckBoxList from "desktop-app/components/common/checkbox-list";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchFiltersProps = {} & StateProps & DispatchProps;

function SearchFilters({ ...props }: SearchFiltersProps) {
  const [values, setValues] = useState<[number, number]>([0, 500]);
  const [countryFilters, setCountryFilters] = useState([
    { label: "Argentina", value: "Argentina", checked: true },
    { label: "Venezuela", value: "Venezuela", checked: true },
    { label: "Peru", value: "Peru", checked: true },
    { label: "Chile", value: "Chile", checked: true },
    { label: "Colombia", value: "Colombia", checked: false },
    { label: "Mexico", value: "Mexico", checked: false },
    { label: "Estados unidos", value: "Estados unidos", checked: false },
    { label: "China", value: "China", checked: false },
    { label: "Japon", value: "Japon", checked: false }
  ]);
  const [categoryFilters, setCategoryFilters] = useState([
    { label: "Actores", value: "Actores", checked: false },
    { label: "Adultos", value: "Adultos", checked: false },
    { label: "Bailarines", value: "Bailarines", checked: false },
    { label: "Chef", value: "Chef", checked: false },
    { label: "Coach", value: "Coach", checked: false },
    { label: "Comediantes", value: "Comediantes", checked: false },
    { label: "Doblaje", value: "Doblaje", checked: false },
    { label: "Fitness", value: "Fitness", checked: false },
    { label: "Imitadores", value: "Imitadores", checked: false },
    { label: "Influencers", value: "Influencers", checked: false },
    { label: "Modelos", value: "Modelos", checked: false },
    { label: "Periodistas", value: "Periodistas", checked: false }
  ]);
  const [develiveryTimeFilter, setDeveliveryTimeFilter] = useState([
    { label: "Flash (24hrs)", value: "flash", checked: true },
    { label: "1-2 dias", value: "1-2 dias", checked: true },
    { label: "3-4 dias", value: "3-4 dias", checked: true },
    { label: "5-7 dias", value: "5-7 dias", checked: true }
  ]);
  const [min, max] = values;
  const resetFilters = () => {
    setCountryFilters((prevState) =>
      prevState.map((option) => ({
        ...option,
        checked: false
      }))
    );
    setCategoryFilters((prevState) =>
      prevState.map((option) => ({
        ...option,
        checked: false
      }))
    );
    setDeveliveryTimeFilter((prevState) =>
      prevState.map((option) => ({
        ...option,
        checked: false
      }))
    );
  };
  useEffect(() => {
    console.log(countryFilters);
  }, [countryFilters]);
  return (
    <div className={styles.SearchFilters}>
      <CheckBoxList
        title="Paises"
        options={countryFilters}
        onCheckOption={(checked, option) => console.log(checked, option)}
      />
      <hr></hr>
      <label>Precio</label>
      <br />
      Min: {min} <br />
      max: {max} <br />
      <RangeSlider
        min={1}
        max={500}
        values={values}
        onValuesUpdated={({ values }) => {
          setValues(values);
        }}
      />
      <hr></hr>
      <CheckBoxList
        title="Categoria"
        controlled
        options={categoryFilters}
        onCheckOption={(checked, option) => console.log(checked, option)}
      />
      <hr></hr>
      <CheckBoxList
        controlled
        title="Tiempo de entrega"
        options={develiveryTimeFilter}
        onCheckOption={(checked, option) => console.log(checked, option)}
      />
      <hr></hr>
      <button className="btn btn-tertiary" onClick={() => resetFilters()}>
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
