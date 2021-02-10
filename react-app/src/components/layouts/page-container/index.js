import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { NavbarSectionLayout } from "../navbar-section";
import { FooterLayout } from "../footer";
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
import { withRouter } from "react-app/src/components/common/routing";
import { useFetchUser } from "lib/user";

const PageContainer = ({
  hasDiscountCoupon,
  cleanUserCelebrityLikes,
  restCountries,
  shouldFetchFlashDeliveryCelebrities,
  applyFetchUserCelebrityLikes,
  fetchUserCelebrityLikes,
  fetchFlashDeliveryCelebrities,
  shouldFetchRestCountries,
  listRestCountries,
  queryParams,
  updateQueryParams,
  showBotMakerFrame,
  router,
  ...props
}) => {
  const [botMakerChild, setBotMakerChild] = useState(undefined);
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [showCouponBanner, setShowCouponBanner] = useState(hasDiscountCoupon);

  const cancelPreviousWaitFor = () => {
    if (botMakerChild && botMakerChild.cancel) {
      botMakerChild.cancel();
    }
  };

  const setBotmakerDisplay = (botMakerChild) => {
    if (!botMakerChild) return;
    botMakerChild.parentElement.classList.toggle("d-none", !showBotMakerFrame);
  };

  const onSearchChange = (keyword) => {
    const newQueryParams = {
      ...queryParams,
      offset: updateQueryParamsInitialState.offset,
      limit: updateQueryParamsInitialState.limit,
      search: keyword
    };
    updateQueryParams(newQueryParams, router);
  };

  useEffect(() => {
    changeBotmakerDisplay();
  }, [showBotMakerFrame]);

  const handleChangeDropdownMenuIsOpen = (dropdownMenuIsOpen) => {
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_MENU", {
      dropdownMenuIsOpen,
      widget: "NavbarSectionLayout",
      path: window.location.pathname
    });
    setDropdownMenuIsOpen(dropdownMenuIsOpen);
  };

  const changeBotmakerDisplay = () => {
    cancelPreviousWaitFor();
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
      botMakerChild.then(setBotmakerDisplay);
      setBotMakerChild(botMakerChild);
    } else {
      setBotmakerDisplay(botMakerChild);
    }
  };

  useEffect(() => {
    cleanUserCelebrityLikes();
    if (applyFetchUserCelebrityLikes) {
      fetchUserCelebrityLikes();
    }
    setCelebrityProfileVersionDependingOfTime();
    if (shouldFetchFlashDeliveryCelebrities) {
      fetchFlashDeliveryCelebrities();
    }
    if (shouldFetchRestCountries && restCountries.length === 0) {
      listRestCountries();
    }
    changeBotmakerDisplay();
    return () => {
      cancelPreviousWaitFor();
    };
  }, []);

  const { user, loading } = useFetchUser();

  const hasSearchedOrFiltered = queryParams !== updateQueryParamsInitialState;

  return (
    <div className="PageContainer">
      {/* NavbarSectionLayout */}
      <Headroom style={{ zIndex: 100000 }} upTolerance={2.5}>
        {props.showNavbar ? (
          <NavbarSectionLayout
            user={user}
            loading={loading}
            className={hasSearchedOrFiltered ? "hidden-hero" : ""}
            onSearchChange={onSearchChange}
            showInputSearchSm={props.showInputSearchSm}
            showSearch={props.showSearch}
            showNavbarButtons={props.showNavbarButtons}
            showSearchWeb={props.showSearchWeb}
            showLogin={props.showLogin}
            showFiltersSection={props.showFiltersSection}
            hideControls={props.hideControls}
            dropdownMenuIsOpen={dropdownMenuIsOpen}
            setDropdownMenuIsOpen={setDropdownMenuIsOpen}
            queryParams={queryParams}
            showCouponBanner={showCouponBanner}
            setShowCouponBanner={setShowCouponBanner}
          />
        ) : null}
        {props.showFiltersSection ? <FiltersSectionLayout /> : null}
      </Headroom>

      {/* End NavbarSectionLayout */}
      <div
        className={`page-container-children ${
          !props.showSearch ? "hidden-search" : ""
        }`}
      >
        {props.children}
        <div
          className={`page-container-children-helper ${
            dropdownMenuIsOpen ? "active" : ""
          }`}
        />
      </div>

      {/* FooterLayout */}
      {props.showFooter ? <FooterLayout /> : null}
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
      {/*{this.showVideoCallsResearch ? <VideoCallsResearch /> : null}*/}
      {/*COOKIES CONSENT*/}
      {/* <DownloadAppBanner /> */}
      {/* <CookiesConsent /> */}

      {/*<BottomNavbarSectionLayout/>*/}
    </div>
  );
};

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
)(withRouter(PageContainer));

export { _PageContainer as PageContainer };
