import React, { Component, createRef } from "react";
import debounce from "lodash.debounce";
import "./styles.scss";
import * as GTM from "../../../state/utils/gtm";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

const shouldFocusSearchKey = "SHOULD_FOCUS_SEARCH";

class NavbarSearchLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: this.props.queryParams.search || "",
      shouldFocus: false
    };

    this.searchRef = createRef();

    this.goToHome = this.goToHome.bind(this);
    this.debouncedOnSearchChange = debounce(this.onSearchChange, 500);
  }

  componentDidUpdate() {
    const shouldFocusSearch = JSON.parse(
      localStorage.getItem(shouldFocusSearchKey)
    );
    if (shouldFocusSearch) {
      this.searchRef.current.focus();
      localStorage.setItem(shouldFocusSearchKey, false);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.removeKeywords) {
      this.setState({
        keyword: ""
      });
    }
  }

  inputHandler({ target }) {
    const { value } = target;
    this.setState({
      keyword: value
    });
    this.debouncedOnSearchChange(value);
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
    if (keyword) localStorage.setItem(shouldFocusSearchKey, true);
    GTM.tagManagerDataLayer("CELEBRITIES_SEARCH_CHANGED", {
      search: this.state.keyword,
      widget: this.constructor.name,
      path: window.location.pathname
    });
    this.props.onSearchChange(keyword);
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  goToHome() {
    history._pushRoute(PATHS.HOME_PATH + "?inputSearchFocus=true");
  }

  sendOnFocusAnalyticsData = () =>
    GTM.tagManagerDataLayer("FOCUS_CELEBRITIES_SEARCH", {
      search: this.state.keyword,
      widget: this.constructor.name,
      path: window.location.pathname
    });

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
              onFocus={this.sendOnFocusAnalyticsData}
              autoFocus={this.props.autoFocus}
              id={"input-search"}
              className="form-control"
              type="text"
              name="search"
              value={this.state.keyword}
              onKeyPress={this.handleKeyPress.bind(this)}
              onChange={this.inputHandler.bind(this)}
              placeholder={this.props.searchLabel}
              ref={this.searchRef}
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
const mapStateToProps = (state) => ({
  isCompleted: state.celebrities.fetchCelebritiesReducer.completed,
  isLoading: state.celebrities.fetchCelebritiesReducer.loading
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
