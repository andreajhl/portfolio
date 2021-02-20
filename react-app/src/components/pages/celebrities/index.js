import React, { Component } from "react";
import { CelebritiesSectionsLayout } from "../../layouts/celebrities-sections";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import * as GTM from "../../../state/utils/gtm";
import { HeroSectionLayout } from "../../layouts/hero-section";
import { FiltersSectionLayout } from "../../layouts/filters-section";
import { Session } from "../../../state/utils/session";
import { queryStringToJSON } from "../../../state/utils/apiService";
import { withRouter } from "react-app/src/components/common/routing";
import Maybe from "../../common/helpers/maybe";
import { withAuth0 } from "@auth0/auth0-react";
import dynamic from "next/dynamic";

const UserLikesSectionLayout = dynamic(
  () =>
    import("../../layouts/user-likes-section").then(
      (mod) => mod.UserLikesSectionLayout
    ),
  { ssr: false }
);

class CelebritiesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: new Session().getSession(),
      showInputSearchSm: false,
      showHeaderFiltersSection: false,
      previousScrollTopPosition: 0
    };
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITIES_PAGE_VIEW", this.props.queryParams);
    window.addEventListener("scroll", this.toggleDynamicHeader);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleDynamicHeader);
  }

  toggleDynamicHeader = () => {
    const scrollTopPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const positionToDisplayDynamicHeaderOnScrollDown = 354;
    const positionToDisplayDynamicHeaderOnScrollUp = 249;

    const isScrollingDown =
      scrollTopPosition >= this.state.previousScrollTopPosition;

    const showHeaderFiltersSection = isScrollingDown
      ? scrollTopPosition >= positionToDisplayDynamicHeaderOnScrollDown
      : scrollTopPosition >= positionToDisplayDynamicHeaderOnScrollUp;

    this.setState({
      showHeaderFiltersSection,
      previousScrollTopPosition: scrollTopPosition
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth0;

    return (
      <>
        <div className={"CelebritiesPage "}>
          <PageContainer
            showFooter={false}
            applyFetchUserCelebrityLikes={isAuthenticated}
            existPreviewResults={this.props.celebrities.length <= 1}
            applyFetchCelebrities
            showFiltersSection={this.state.showHeaderFiltersSection}
            showVideoCallsResearch
            shouldFetchCountryCode
          >
            <HeroSectionLayout />
            <FiltersSectionLayout />
            <Maybe it={isAuthenticated}>
              <UserLikesSectionLayout />
            </Maybe>
            <CelebritiesSectionsLayout
              landingId={
                queryStringToJSON(this.props.location.search)?.landingId
              }
            />
          </PageContainer>
        </div>
      </>
    );
  }
}

CelebritiesPage.propTypes = {};

CelebritiesPage.defaultProps = {
  celebrities: [],
  paginationData: {}
};

const mapStateToProps = ({
  celebrities,
  restCountries,
  countries,
  filters,
  cursor
}) => ({
  isLoading: celebrities.fetchCelebritiesReducer.loading,
  isCompleted: celebrities.fetchCelebritiesReducer.completed,
  celebrities: celebrities.fetchCelebritiesReducer.data.results,
  paginationData: celebrities.fetchCelebritiesReducer.data.informationPage,
  queryParams: celebrities.queryParamsReducer,
  countries: countries.countriesReducer.results,
  restCountries: restCountries.fetchCountriesReducer.data,
  selectedCategory: filters.filtersReducer.selectedCategory,
  selectedCountry: filters.filtersReducer.selectedCountry,
  cursor: cursor.cursorReducer.Position
});

const mapDispatchToProps = {
  fetchCelebrities: celebrityOperations.list,
  updateQueryParams: celebrityOperations.updateQueryParams
};

const _CelebritiesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuth0(CelebritiesPage)));

export { _CelebritiesPage as CelebritiesPage };
