import React, { Component } from "react";
import debounce from "lodash.debounce";
import "./styles.scss";
import * as GTM from "../../../state/utils/gtm";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class NavbarSearchLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: this.props.queryParams.search || ""
    };

    this.goToHome = this.goToHome.bind(this);
    this.debouncedOnSearchChange = debounce(this.onSearchChange, 200);
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (nextProps.removeKeywords) {
      this.setState({
        keyword: ""
      });
    }
  }

  inputHandler({ target }) {
    // if (e.target.value && e.target.value.length > 1) {
    //   if (e.target.value.length % 2 === 0) {
    //     if (this.onSearchChange) {
    //       this.onSearchChange(e.target.value);
    //     }
    //   }
    // } else if (e.target.value.length === 0) {
    //   this.onSearchChange(e.target.value);
    // }
    const { value } = target;
    this.debouncedOnSearchChange(value);
    this.setState({
      keyword: value
    });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.onSearchChange(this.state.keyword);
    }
  }

  handleBlur() {
    this.onSearchChange(this.state.keyword);
  }

  onSearchChange(keyword) {
    if (this.props.isLoading) return;
    GTM.tagManagerDataLayer("CELEBRITIES_SEARCH_CHANGED", this.state.keyword);
    this.props.onSearchChange(keyword);
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  goToHome() {
    history._pushRoute(PATHS.HOME_PATH + "?inputSearchFocus=true");
  }

  render() {
    return (
      <div className="NavbarSearchLayout">
        <div className="form-group">
          <div className="input-group">
            <i
              className={"fa fa-search"}
              onClick={this.handleBlur.bind(this)}
            />
            <input
              autoFocus={this.props.autoFocus}
              id={"input-search"}
              className="form-control"
              type="text"
              name="search"
              value={this.state.keyword}
              onKeyPress={this.handleKeyPress.bind(this)}
              onChange={this.inputHandler.bind(this)}
              placeholder={this.props.searchLabel}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Set defaultProps
NavbarSearchLayout.defaultProps = {
  searchLabel: "Ej: Pibe Valderrama, Comediantes, Músicos",
  onSearchChange: function () {},
  autoFocus: false
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
  isCompleted: state.celebrities.fetchCelebritiesReducer.completed,
  isLoading: state.celebrities.fetchCelebritiesReducer.loading,
  queryParams: state.celebrities.queryParamsReducer
});

// mapStateToProps
const mapDispatchToProps = {
  updateQueryParams: celebrityOperations.updateQueryParams
};

// Export Class
const _NavbarSearchLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarSearchLayout);
export { _NavbarSearchLayout as NavbarSearchLayout };
