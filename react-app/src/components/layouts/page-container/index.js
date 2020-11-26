import React, { Component } from "react";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { NavbarSectionLayout } from "../navbar-section";
import { FooterLayout } from "../footer";
import "./styles.scss";
import { CookiesConsent } from "../cookies-consent";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import * as GTM from "../../../state/utils/gtm";
import { celebrityLikesOperations } from "../../../state/ducks/celebrity-likes";
import { Session } from "../../../state/utils/session";
import { VideoCallsResearch } from "../../containers/videocalls-research";

class PageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: { status: 50 },
      dropdownMenuIsOpen: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.cleanUserCelebrityLikes();
    const isLogged = new Session().getSession();
    if (this.props.applyFetchUserCelebrityLikes && isLogged) {
      this.props.fetchUserCelebrityLikes();
    }
    /* if (this.props.applyFetchCelebrities === true) {
      const queryParams = this.props.queryParams;
      if (!window.location.search) {
        queryParams["currentPage"] = 1;
        this.props.updateQueryParams(queryParams);
      }
    } */
  }

  onSearchChange(keyword) {
    const queryParams = {
      ...this.props.queryParams,
      offset: updateQueryParamsInitialState.offset,
      limit: updateQueryParamsInitialState.limit,
      search: keyword
    };
    this.props.updateQueryParams(queryParams);
  }

  setDropdownMenuIsOpen = (dropdownMenuIsOpen) => {
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_MENU", {});
    this.setState({ dropdownMenuIsOpen });
  };

  render() {
    const hasSearchedOrFiltered =
      this.props.queryParams !== updateQueryParamsInitialState;

    return (
      <div className="PageContainer">
        {/* NavbarSectionLayout */}
        {this.props.showNavbar ? (
          <NavbarSectionLayout
            className={hasSearchedOrFiltered ? "hidden-hero" : ""}
            onSearchChange={this.onSearchChange}
            showInputSearchSm={this.props.showInputSearchSm}
            showSearch={this.props.showSearch}
            showNavbarButtons={this.props.showNavbarButtons}
            showSearchWeb={this.props.showSearchWeb}
            showLogin={this.props.showLogin}
            showFiltersSection={this.props.showFiltersSection}
            hideControls={this.props.hideControls}
            dropdownMenuIsOpen={this.state.dropdownMenuIsOpen}
            setDropdownMenuIsOpen={this.setDropdownMenuIsOpen}
            queryParams={this.props.queryParams}
          />
        ) : null}
        {/* End NavbarSectionLayout */}
        <div
          className={`page-container-children ${
            !this.props.showSearch ? "hidden-search" : ""
          }`}
        >
          {this.props.children}
          <div
            className={`page-container-children-helper ${
              this.state.dropdownMenuIsOpen ? "active" : ""
            }`}
          />
        </div>

        {/* FooterLayout */}
        {this.props.showFooter ? <FooterLayout /> : null}
        {/* End FooterLayout */}

        {/*EmptyImage*/}
        <img
          src="/assets/img/avatar-blank.png"
          style={{ display: "none" }}
          alt="None"
        />

        {this.props.showVideoCallsResearch ? <VideoCallsResearch /> : null}
        {/*COOKIES CONSENT*/}
        <CookiesConsent />

        {/*<BottomNavbarSectionLayout/>*/}
      </div>
    );
  }
}

// Set propTypes
PageContainer.propTypes = {};

// Set defaultProps
PageContainer.defaultProps = {
  applyFetchCelebrities: false,
  celebrities: [],
  paginationData: {},
  onSearchChange: () => {},
  queryParams: {},
  showFooter: true,
  showNavbar: true,
  showSearch: true,
  showNavbarButtons: true,
  showSearchWeb: true,
  showInputSearchSm: true,
  showLogin: true,
  hideControls: false,
  showVideoCallsResearch: false
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.fetchCelebritiesReducer.loading,
  celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
  paginationData: state.celebrities.fetchCelebritiesReducer.data.informationPage
});

// mapStateToProps
const mapDispatchToProps = {
  updateQueryParams: celebrityOperations.updateQueryParams,
  fetchUserCelebrityLikes: celebrityLikesOperations.fetchUserCelebrityLikes,
  cleanUserCelebrityLikes:
    celebrityLikesOperations.fetchUserCelebrityLikesCleanUp
};

// Export Class
const _PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
export { _PageContainer as PageContainer };
