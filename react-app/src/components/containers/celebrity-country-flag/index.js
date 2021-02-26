import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import limitString from "../../../utils/limitString";

const CountryFlag = ({
  className = "",
  width = "24px",
  countries = [],
  countryCode = "USA"
}) => {
  const [celebrityCountry, setCelebrityCountry] = useState(null);

  useEffect(() => {
    setCelebrityCountry(
      countries?.find?.((country) => country.alpha3Code === countryCode)
    );
  }, [countries, countryCode]);

  return celebrityCountry ? (
    <img
      src={`https://flagcdn.com/w20/${celebrityCountry.alpha2Code.toLowerCase()}.webp`}
      alt={limitString(celebrityCountry.name, 10)}
      className={className}
      width={width}
    />
  ) : (
    <span
      className={`${className} text-primary spinner-grow spinner-grow-sm`}
      role="status"
      aria-hidden="true"
    />
  );
};

const mapStateToProps = (state) => ({
  countries: state.restCountries.fetchCountriesReducer.data
});

const _CountryFlag = connect(mapStateToProps)(CountryFlag);

export { _CountryFlag as CountryFlag };
