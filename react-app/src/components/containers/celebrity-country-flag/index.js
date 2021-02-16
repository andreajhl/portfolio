import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import limitString from "../../../utils/limitString";
import Maybe from "../../common/helpers/maybe";
import OptimizedImage from "../../common/helpers/optimized-image";

const heavyFlagsSvgs = ["mex", "esp", "ecu"];

const isHeavyFlag = (flag) =>
  heavyFlagsSvgs.includes(String(flag).split("/").pop().split(".").shift());

const OptimizedFlagImage = ({ className, ...props }) => {
  return (
    <div
      style={{ position: "relative", width: props.width, height: props.height }}
      className={className}
    >
      <span
        className={`text-primary spinner-grow spinner-grow-sm position-absolute`}
        role="status"
        aria-hidden="true"
      />
      <OptimizedImage {...props} />
    </div>
  );
};

const getHeight = (width) => {
  const heightProportion = 1.25;
  return typeof width === "number"
    ? width / heightProportion
    : Number(width.replace(/\D/g, "")) / heightProportion;
};

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
    <Maybe
      it={isHeavyFlag(celebrityCountry.flag)}
      orElse={
        <img
          src={
            celebrityCountry.alpha3Code === "USA"
              ? "/assets/img/usa.svg"
              : celebrityCountry.flag
          }
          alt={limitString(celebrityCountry.name, 10)}
          className={className}
          width={width}
        />
      }
    >
      <OptimizedFlagImage
        src={celebrityCountry.flag}
        alt={limitString(celebrityCountry.name, 10)}
        className={className}
        width={width}
        height={getHeight(width)}
      />
    </Maybe>
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
