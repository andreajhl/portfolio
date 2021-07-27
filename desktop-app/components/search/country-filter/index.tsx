import CheckBoxList from "desktop-app/components/common/checkbox-list";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { listV2 } from "react-app/src/state/ducks/countries/actions";
import { connect, ConnectedProps } from "react-redux";
import { defineMessages, useIntl } from "react-intl";
import getTranslatedCountryName from "lib/utils/getTranslatedCountryName";
import removeParenthesis from "lib/utils/removeParenthesis";

const generateMapForKeysValue = (array, value = true) => {
  const newState = new Map();
  array.forEach((id) => newState.set(id, value));
  return newState;
};

const messages = defineMessages({
  title: {
    defaultMessage: "Paises",
  },
});

const mapStateToProps = ({ countries, searchFilters }) => {
  return {
    countries: countries.countriesReducer.data.results,
    searchFilters,
  };
};

const mapDispatchToProps = {
  listCountries: listV2,
  updateSearchFilters,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CountryFilterProps = {} & PropsFromRedux;

function CountryFilter({
  countries,
  listCountries,
  updateSearchFilters,
  searchFilters,
}: CountryFilterProps) {
  const { formatMessage } = useIntl();
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
        country_id: countriesIDKeys,
      });
      return;
    }

    if (
      countriesIDKeys !== searchFilters.country_id &&
      country_IDs.length > 0
    ) {
      updateSearchFilters({
        country_id: countriesIDKeys,
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
      countries.map((country, index) => {
        const countryName = getTranslatedCountryName(country, formatMessage);
        return {
          label: removeParenthesis(countryName),
          value: country.id,
          name: country.name + index,
          checked: countriesChecked.get(String(country.id)),
        };
      }),
    [countries, formatMessage, countriesChecked]
  );
  return (
    <CheckBoxList
      title={formatMessage(messages.title)}
      options={memoizedValuesForCountries}
      handleChange={(event) => handleChangeCheckbox(event, setCountriesChecked)}
    />
  );
}

const _CountryFilter = connector(CountryFilter);

export { _CountryFilter as CountryFilter };
