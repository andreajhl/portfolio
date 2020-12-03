import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import { restCountriesOperations } from "../../../state/ducks/rest-countries";
import limitString from "../../../utils/limitString";

const CountryFlag = ({ countries, fetchCountries, countryCode }) => {
  const [celebrityCountry, setCelebrityCountry] = useState(null);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    } else {
      setCelebrityCountry(
        countries.find((country) => country.alpha3Code === countryCode)
      );
    }
  }, [countries.length]);

  return celebrityCountry ? (
    <Image
      src={
        "/assets/img/usa.svg" || celebrityCountry.alpha3Code === "USA"
          ? "/assets/img/usa.svg"
          : celebrityCountry.flag
      }
      alt={limitString(celebrityCountry.name, 10)}
      className="celebrity__country"
      width="24px"
    />
  ) : null;
};

const mapStateToProps = (state) => ({
  countries: state.restCountries.fetchCountriesReducer.data
});

const mapDispatchToProps = {
  fetchCountries: restCountriesOperations.list
};

const _CountryFlag = connect(mapStateToProps, mapDispatchToProps)(CountryFlag);
export { _CountryFlag as CountryFlag };
