import React, { Component, createRef } from "react";
import { CelebritiesSectionsLayout } from "../../layouts/celebrities-sections";
import { PageContainer } from "../../layouts/page-container";
import { UserLikesSectionLayout } from "../../layouts/user-likes-section";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";

import * as GTM from "../../../state/utils/gtm";
import { HeroSectionLayout } from "../../layouts/hero-section";
import { FiltersSectionLayout } from "../../layouts/filters-section";
import MetaTags from "react-meta-tags";
import { Session } from "../../../state/utils/session";
import { queryStringToJSON } from "../../../state/utils/apiService";

class CelebritiesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: new Session().getSession(),
      showInputSearchSm: false,
      showFFBModal: localStorage.getItem("ffbmodal") === null,
      metaTagTitle:
        "Famosos.com - Videos personalizados de tus famosos favoritos.",
      metaTagDescription:
        "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
      showHeaderFiltersSection: false,
      previousScrollTopPosition: 0
    };
    this.scrollDiv = createRef();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openModal() {
    this.setState({
      showFFBModal: true
    });
  }

  closeModal() {
    this.setState(
      {
        showFFBModal: false
      },
      () => localStorage.setItem("ffbmodal", "")
    );
  }

  onPaginationChange(page) {
    const queryParams = this.props.queryParams;
    queryParams["currentPage"] = page;
    this.props.updateQueryParams(queryParams);
  }

  returnTitle = () => {
    if (!this.props.selectedCategory.id && !this.props.selectedCountry.id) {
      return "Famosos destacados";
    } else if (
      this.props.celebrities.length &&
      (this.props.selectedCategory.id ||
        this.props.selectedCountry.id ||
        this.props.queryParams.search)
    ) {
      return "Famosos encontrados";
    } else if (!this.props.celebrities.length && this.props.isLoading) {
      return "Buscando...";
    } else if (!this.props.celebrities.length && this.props.isCompleted) {
      return "No se encontraron famosos para esta busqueda";
    }
  };

  render() {
    return (
      <>
        <div className={"CelebritiesPage "}>
          <div>
            <MetaTags>
              <title>{this.state.metaTagTitle}</title>
              <meta
                name="description"
                content={this.state.metaTagDescription}
              />
            </MetaTags>
          </div>

          <PageContainer
            showFooter={false}
            applyFetchUserCelebrityLikes
            existPreviewResults={
              this.props.celebrities.length > 1 ? false : true
            }
            applyFetchCelebrities
            showFiltersSection={this.state.showHeaderFiltersSection}
            showVideoCallsResearch
            shouldFetchCountryCode
          >
            <HeroSectionLayout />
            <FiltersSectionLayout />
            {this.state.session ? <UserLikesSectionLayout /> : null}

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
)(CelebritiesPage);

export { _CelebritiesPage as CelebritiesPage };
