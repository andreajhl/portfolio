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
import { restCountriesOperations } from "../../../state/ducks/rest-countries";
// import { VideoCallsResearch } from "../../containers/videocalls-research";
import { setCelebrityProfileVersionDependingOfTime } from "../../../utils/celebrityProfileVersion";
import Headroom from "react-headroom";
import { FiltersSectionLayout } from "../filters-section";
import waitFor from "../../../utils/waitFor";
import { withLoginHandler } from "src/utils/withLoginHandler";
// import { DownloadAppBanner } from "../download-app-banner";

class PageContainer extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.hasDiscountCoupon);

    this.state = {
      params: { status: 50 },
      dropdownMenuIsOpen: false,
      showCouponBanner: this.props.hasDiscountCoupon
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setShowCouponBanner = (showCouponBanner) => {
    this.setState({ showCouponBanner });
  };

  componentDidMount() {
    console.log(this.props);
    this.props.cleanUserCelebrityLikes();
    const isLogged = new Session().getSession();
    const shouldAuthenticate = localStorage.getItem("shouldAuthenticate");
    const finalRedirect = localStorage.getItem("finalRedirect");
    if (shouldAuthenticate === "true" && finalRedirect && !isLogged) {
      localStorage.removeItem("shouldAuthenticate");
      this.props.loginHandler();
    }
    if (this.props.applyFetchUserCelebrityLikes && isLogged) {
      this.props.fetchUserCelebrityLikes();
    }
    setCelebrityProfileVersionDependingOfTime();

    if (this.props.shouldFetchFlashDeliveryCelebrities) {
      this.props.fetchFlashDeliveryCelebrities();
    }

    if (
      this.props.shouldFetchRestCountries &&
      this.props.restCountries.length === 0
    ) {
      this.props.listRestCountries();
    }

    this.changeBotmakerDisplay();

    /* if (this.props.applyFetchCelebrities === true) {
      const queryParams = this.props.queryParams;
      if (!window.location.search) {
        queryParams["currentPage"] = 1;
        this.props.updateQueryParams(queryParams);
      }
    } */
  }

  cancelPreviousWaitFor = () => {
    const { botMakerChild } = this.state;
    if (botMakerChild && botMakerChild.cancel) {
      botMakerChild.cancel();
    }
  };

  changeBotmakerDisplay = () => {
    this.cancelPreviousWaitFor();
    const botMakerChild = waitFor(
      () =>
        document.querySelector("iframe[title='Botmaker']") ||
        document.querySelector(
          "img[src='https://storage.googleapis.com/m-infra.appspot.com/public/whatsapp/Whatsapp_logo.svg']"
        )?.parentElement,
      500,
      1000
    );
    const isAsync = typeof botMakerChild.then === "function";

    if (isAsync) {
      botMakerChild.then(this.setBotmakerDisplay);
      this.setState({ botMakerChild });
    } else {
      this.setBotmakerDisplay(botMakerChild);
    }
  };

  setBotmakerDisplay = (botMakerChild) => {
    if (!botMakerChild) return;
    botMakerChild.parentElement.classList.toggle(
      "d-none",
      !this.props.showBotMakerFrame
    );
  };

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
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_MENU", {
      dropdownMenuIsOpen,
      widget: "NavbarSectionLayout",
      path: window.location.pathname
    });
    this.setState({ dropdownMenuIsOpen });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.showBotMakerFrame !== prevProps.showBotMakerFrame) {
      this.changeBotmakerDisplay();
    }
  };

  componentWillUnmount = () => {
    this.cancelPreviousWaitFor();
  };

  render() {
    const hasSearchedOrFiltered =
      this.props.queryParams !== updateQueryParamsInitialState;

    return (
      <div className="PageContainer">
        {/* NavbarSectionLayout */}
        <Headroom style={{ zIndex: 100000 }} upTolerance={2.5}>
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
              showCouponBanner={this.state.showCouponBanner}
              setShowCouponBanner={this.setShowCouponBanner}
            />
          ) : null}
          {this.props.showFiltersSection ? <FiltersSectionLayout /> : null}
        </Headroom>

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

        <img
          src="/assets/img/avatar-blank.png"
          style={{ display: "none" }}
          alt="Imagen de Avatar vació pre-cagada"
        />

        <img
          className="d-none"
          src="/assets/img/wifi-connection-error.svg"
          alt="Imagen de Error de conexión de internet pre-cargada"
        />
        {/*{this.props.showVideoCallsResearch ? <VideoCallsResearch /> : null}*/}
        {/*COOKIES CONSENT*/}
        {/* <DownloadAppBanner /> */}
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
  showVideoCallsResearch: false,
  shouldFetchRestCountries: true,
  showBotMakerFrame: false
};

// mapStateToProps
const mapStateToProps = (state) => {
  return {
    restCountries: state.restCountries.fetchCountriesReducer.data,
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData:
      state.celebrities.fetchCelebritiesReducer.data.informationPage,
    shouldFetchFlashDeliveryCelebrities: !state.celebrities
      .fetchFlashDeliveryCelebritiesReducer.completed,
    hasDiscountCoupon:
      state.discountCoupons.getDiscountCouponBannerReducer.data.couponCode &&
      state.discountCoupons.timeDifferenceReducer
  };
};

// mapStateToProps
const mapDispatchToProps = {
  updateQueryParams: celebrityOperations.updateQueryParams,
  fetchUserCelebrityLikes: celebrityLikesOperations.fetchUserCelebrityLikes,
  cleanUserCelebrityLikes:
    celebrityLikesOperations.fetchUserCelebrityLikesCleanUp,
  fetchFlashDeliveryCelebrities:
    celebrityOperations.fetchFlashDeliveryCelebrities,
  listRestCountries: restCountriesOperations.list
};

// Export Class
const _PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoginHandler(PageContainer));
export { _PageContainer as PageContainer };
