import React, { Component } from "react";
import ReactFlagsSelect from "react-flags-select";

import { restCountriesOperations } from "../../../state/ducks/rest-countries";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";

class FlagsSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      customLabels: {}
    };

    this.onSelectFlag = this.onSelectFlag.bind(this);
  }

  componentWillMount() {
    this.props.fetchCountries();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.isCompleted) {
      let items = nextProps.countries;
      const countries = [];
      const customLabels = {};

      nextProps.countries.forEach((c) => {
        const name = " " + c.name;
        countries.push(c.alpha2Code);
        customLabels[c.alpha2Code] = "+" + c.callingCodes[0] + name;
      });

      this.setState({ countries, customLabels });
    }
  }

  onSelectFlag(countryCode) {
    this.props.onSelect(
      this.props.countries.find((c) => c.alpha2Code === countryCode)
    );
  }

  render() {
    return (
      <div className="FlagsSelect">
        {!this.state.countries.length ? (
          <ReactFlagsSelect
            className="form-control"
            defaultCountry="US"
            onSelect={this.onSelectFlag}
          />
        ) : (
          <ReactFlagsSelect
            className="form-control"
            defaultCountry="CO"
            countries={this.state.countries}
            customLabels={this.state.customLabels}
            onSelect={this.onSelectFlag}
          />
        )}
      </div>
    );
  }
}

// Set propTypes
FlagsSelect.propTypes = {
  countries: PropTypes.array
};

// Set defaultProps
FlagsSelect.defaultProps = {
  countries: [],
  onSelect: () => {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.restCountries.fetchCountriesReducer.loading,
  isCompleted: state.restCountries.fetchCountriesReducer.completed,
  countries: state.restCountries.fetchCountriesReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  fetchCountries: restCountriesOperations.list
};

// Export Class
const _FlagsSelect = connect(mapStateToProps, mapDispatchToProps)(FlagsSelect);
export { _FlagsSelect as FlagsSelect };
