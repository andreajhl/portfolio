import CheckBoxList from "desktop-app/components/common/checkbox-list";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from "react";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { countriesOperations } from "react-app/src/state/ducks/countries";
import { connect } from "react-redux";

const mapStateToProps = ({ countries, searchFilters }) => {
  return {
    countries: countries.countriesReducer.data.results,
    searchFilters
  };
};

const mapDispatchToProps = {
  listCountries: countriesOperations.list,
  updateSearchFilters
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const generateMapForKeysValue = (array, value = true) => {
  const newState = new Map();
  array.forEach((id) => newState.set(id, value));
  return newState;
};
type CountryFilterProps = StateProps & DispatchProps;
function CountryFilter({
  countries,
  listCountries,
  updateSearchFilters,
  searchFilters
}: CountryFilterProps) {
  const [countriesChecked, setCountriesChecked] = useState(
    new Map(
      searchFilters.country_id
        ? generateMapForKeysValue(searchFilters.country_id.split(","))
        : []
    )
  );
  useEffect(() => {
    const shouldFetchFilterOptions = !countries.length;
    if (!shouldFetchFilterOptions) return;
    listCountries({ orderBy: "name asc" });
  }, [listCountries, countries]);

  useEffect(() => {
    // Si no existe el key country_id en redux store
    // realizar reset de todos los countries checked
    if (!searchFilters.country_id) return setCountriesChecked(new Map());

    const country_IDs = Array.from(countriesChecked.keys()).join();
    // Si searchFilters realiza un update pero country_id posee los mismos valores
    // que el actual state no actualizar estado
    if (country_IDs === searchFilters.country_id) return;
    const parse_IDs = searchFilters.country_id.split(",");
    const newState = new Map();
    parse_IDs.forEach((id) => newState.set(id, true));
    setCountriesChecked(newState);
  }, [searchFilters]);

  useEffect(() => {
    let country_IDs = Array.from(countriesChecked).filter(
      ([_, isChecked]) => isChecked === true
    );
    const countriesIDKeys = country_IDs.map(([id]) => id).join();

    if (
      country_IDs.length === 0 &&
      searchFilters?.country_id &&
      searchFilters?.country_id?.length !== 0
    ) {
      updateSearchFilters({
        country_id: countriesIDKeys
      });
      return;
    }

    if (
      countriesIDKeys !== searchFilters.country_id &&
      country_IDs.length > 0
    ) {
      updateSearchFilters({
        country_id: countriesIDKeys
      });
    }
  }, [countriesChecked]);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<Map<any, any>>>
  ) => {
    const item = e.target.value;
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
        checked: countriesChecked.get(String(country.id))
      })),
    [countriesChecked, countries]
  );
  return (
    <CheckBoxList
      title="Paises"
      options={memoizedValuesForCountries}
      handleChange={(event) => handleChangeCheckbox(event, setCountriesChecked)}
    />
  );
}

const _CountryFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryFilter);

export { _CountryFilter as CountryFilter };
