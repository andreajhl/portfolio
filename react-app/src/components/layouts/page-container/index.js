import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { NavbarSectionLayout } from "../navbar-section";
import { FooterLayout } from "../footer";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import * as GTM from "../../../state/utils/gtm";
import { celebrityLikesOperations } from "../../../state/ducks/celebrity-likes";
import { restCountriesOperations } from "../../../state/ducks/rest-countries";
import Headroom from "react-headroom";
import { FiltersSectionLayout } from "../filters-section";
import waitFor from "../../../utils/waitFor";
import { withRouter } from "react-app/src/components/common/routing";
import Maybe from "../../common/helpers/maybe";
import initializeBotMaker from "react-app/src/utils/initializeBotMaker";
import dynamic from "next/dynamic";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { Session } from "react-app/src/state/utils/session.js";

function ignoreError() {}

const CookiesConsent = dynamic(
  () => import("../cookies-consent").then((mod) => mod.CookiesConsent),
  { ssr: false }
);

function PageContainer({
  hasDiscountCoupon,
  cleanUserCelebrityLikes,
  restCountries,
  applyFetchUserCelebrityLikes,
  fetchUserCelebrityLikes,
  shouldFetchRestCountries,
  listRestCountries,
  queryParams,
  updateQueryParams,
  showBotMakerFrame,
  router,
  ...props
}) {
  const botMakerChildRef = useRef();
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [showCouponBanner, setShowCouponBanner] = useState(hasDiscountCoupon);
  const loginHandler = useLoginHandler();

  function cancelPreviousWaitFor() {
    if (
      botMakerChildRef.current &&
      typeof botMakerChildRef.current.cancel === "function"
    ) {
      botMakerChildRef.current.cancel();
    }
  }

  const setBotmakerDisplay = (botMakerChild) => {
    if (!botMakerChild) return;
    botMakerChild.parentElement.classList.toggle("d-none", !showBotMakerFrame);
  };

  const onSearchChange = (keyword) => {
    const newQueryParams = {
      ...queryParams,
      offset: updateQueryParamsInitialState.offset,
      limit: updateQueryParamsInitialState.limit,
      search: keyword,
    };
    updateQueryParams(newQueryParams, router);
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
      botMakerChild.then(setBotmakerDisplay).catch(ignoreError);
      botMakerChildRef.current = botMakerChild;
    } else {
      setBotmakerDisplay(botMakerChild);
    }
  };

  useEffect(() => {
    if (showBotMakerFrame) {
      initializeBotMaker(document);
    }
    changeBotmakerDisplay();
    return () => {
      cancelPreviousWaitFor();
    };
  }, [showBotMakerFrame]);

  const handleChangeDropdownMenuIsOpen = (dropdownMenuIsOpen) => {
    GTM.tagManagerDataLayer("CLICK_ON_DROPDOWN_MENU", {
      dropdownMenuIsOpen,
      widget: "NavbarSectionLayout",
      path: window.location.pathname,
    });
    setDropdownMenuIsOpen(dropdownMenuIsOpen);
  };

  useEffect(() => {
    const isLogged = new Session().getSession();
    cleanUserCelebrityLikes();
    if (applyFetchUserCelebrityLikes && isLogged) {
      fetchUserCelebrityLikes();
    }
    if (shouldFetchRestCountries && restCountries.length === 0) {
      listRestCountries();
    }
  }, []);

  useEffect(() => {
    const isLogged = new Session().getSession();
    const shouldAuthenticate = localStorage.getItem("shouldAuthenticate");
    const finalRedirect = localStorage.getItem("finalRedirect");
    if (shouldAuthenticate === "true" && finalRedirect && !isLogged) {
      localStorage.removeItem("shouldAuthenticate");
      loginHandler();
    }
  }, [loginHandler]);

  const hasSearchedOrFiltered = queryParams !== updateQueryParamsInitialState;

  return (
    <div className="PageContainer">
      <Headroom style={{ zIndex: 900 }} upTolerance={2.5}>
        <Maybe it={props.showNavbar}>
          <NavbarSectionLayout
            className={hasSearchedOrFiltered ? "hidden-hero" : ""}
            onSearchChange={onSearchChange}
            showInputSearchSm={props.showInputSearchSm}
            showSearch={props.showSearch}
            showNavbarButtons={props.showNavbarButtons}
            showSearchWeb={props.showSearchWeb}
            showLogin={props.showLogin}
            showFiltersSection={props.showFiltersSection}
            hideControls={props.hideControls}
            queryParams={queryParams}
            showCouponBanner={showCouponBanner}
            setShowCouponBanner={setShowCouponBanner}
          />
        </Maybe>
        <Maybe it={props.showFiltersSection}>
          <FiltersSectionLayout />
        </Maybe>
      </Headroom>

      <div
        className={`page-container-children ${
          !props.showSearch ? "hidden-search" : ""
        }`}
      >
        {props.children}
        <div className={`page-container-children-helper`} />
      </div>

      <Maybe it={props.showFooter}>
        <FooterLayout />
      </Maybe>

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

      <CookiesConsent />
    </div>
  );
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
  showBotMakerFrame: false,
};

// mapStateToProps
const mapStateToProps = (state) => {
  return {
    restCountries: state.restCountries.fetchCountriesReducer.data,
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData:
      state.celebrities.fetchCelebritiesReducer.data.informationPage,
    hasDiscountCoupon:
      state.discountCoupons.getDiscountCouponBannerReducer.data.couponCode &&
      state.discountCoupons.timeDifferenceReducer,
  };
};

// mapStateToProps
const mapDispatchToProps = {
  updateQueryParams: celebrityOperations.updateQueryParams,
  fetchUserCelebrityLikes: celebrityLikesOperations.fetchUserCelebrityLikes,
  cleanUserCelebrityLikes:
    celebrityLikesOperations.fetchUserCelebrityLikesCleanUp,
  listRestCountries: restCountriesOperations.list,
};

// Export Class
const _PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageContainer));

export { _PageContainer as PageContainer };
