import React, { Fragment } from 'react';
import { connect } from "react-redux";
import Image from 'react-bootstrap/Image'
import {restCountriesOperations} from "../../../state/ducks/rest-countries";

const index = ({countries,fetchCountries,countryCode}) => {
    console.log(countries,countryCode);
    let celebrityCountry;
    let ImageResult;
    if(countries.length === 0){
        fetchCountries();
    }else{
        celebrityCountry = countries.find(
            (country) => country.alpha3Code === countryCode
        );
        ImageResult= (<Image
            src={
                celebrityCountry.alpha3Code === "USA"
                  ? "/assets/img/usa.svg"
                  : celebrityCountry.flag
              }
              alt="Country"
              className="celebrity__country"
              width="24px"
            ></Image>)
    }   
    return (
        <Fragment>
            {ImageResult}
        </Fragment>
    );
}
// mapStateToProps
const mapStateToProps = (state) => ({
    countries: state.restCountries.fetchCountriesReducer.data
});

// mapDispatchToProps
const mapDispatchToProps = {
    fetchCountries: restCountriesOperations.list,
};


  
export default connect(mapStateToProps, mapDispatchToProps)(index);
