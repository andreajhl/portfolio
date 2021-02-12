import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { CurrencyDropdownLayout } from "../currency-dropdown";
import { NavbarSearchLayout } from "../navbar-search";
import { ROOT_PATH } from "../../../routing/Paths";
import PropTypes from "prop-types";
import { Session } from "../../../state/utils/session";
import * as GTM from "../../../state/utils/gtm";
import "./styles.scss";
import { BannerPromoLayout } from "../banner-promo";
import { DropdownMenuLayout } from "../dropdown-menu";
import LoginButton from "../../containers/login-button/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../containers/logout-button/logout-button";

export const sendDropdownLinkAnalyticsData = (eventName, target) => {
  if (!target.matches("a")) return;
  GTM.tagManagerDataLayer(eventName + "_DROPDOWN_MENU_LINK", {
    widget: "NavbarSectionLayout",
    path: window.location.pathname,
    anchorInnerText: target.innerText,
    anchorHref: target.pathname
  });
};

const registerLogoLinkClick = () =>
  GTM.tagManagerDataLayer("CLICK_LOGO_LINK", {
    widget: "NavbarSectionLayout",
    path: window.location.pathname
  });

const NavbarSectionLayout = ({
  className,
  onSearchChange,
  showSearch,
  showLogin,
  queryParams,
  dropdownMenuIsOpen,
  setDropdownMenuIsOpen,
  showCouponBanner,
  setShowCouponBanner
}) => {
  const isLogged = new Session().getSession();
  const { isLoading, isAuthenticated, user } = useAuth0();
  return (
    <>
      <div className={`NavbarSectionLayout ${className}`}>
        <BannerPromoLayout
          showCouponBanner={showCouponBanner}
          setShowCouponBanner={setShowCouponBanner}
        />
        <div className='top-bar container mx-auto p-0 row'>
          <div className='top-bar__left-side col-4 p-0'>
            <DropdownMenuLayout
              dropdownMenuIsOpen={dropdownMenuIsOpen}
              setDropdownMenuIsOpen={setDropdownMenuIsOpen}
              isLogged={!isLoading && isAuthenticated}
            />
          </div>
          <div className='top-bar__center-side col-4'>
            <NavLink
              to={ROOT_PATH}
              className='top-bar__logo-link'
              onClick={registerLogoLinkClick}
            >
              <img
                className='top-bar__logo'
                src='/assets/img/famosos-logo.svg'
                alt='Famosos Logo'
              />
            </NavLink>
          </div>

          <div className='top-bar__right-side col-4 p-0 row m-0'>
            {!isAuthenticated && !isLoading ? (
              <div className='col d-none d-md-flex align-items-center'>
                <NavLink
                  className='btn btn-outline-primary ml-auto btn-sm top-bar__login-btn mt-1'
                  activeClassName=''
                  to={PATHS.SIGN_IN_PATH}
                  onClick={({ target }) =>
                    sendDropdownLinkAnalyticsData("CLICK", target)
                  }
                  onMouseOver={({ target }) =>
                    sendDropdownLinkAnalyticsData("HOVER", target)
                  }
                >
                  Ingresar
                </NavLink>
              </div>
            ) : null}
            <div className='top-bar__currency mr-2 ml-auto'>
              <CurrencyDropdownLayout />
            </div>
          </div>
          {showSearch ? (
            <div className='col-12 pt-2 px-0'>
              <div className='d-block top-bar__search-sm'>
                <NavbarSearchLayout
                  searchLabel='Buscar famosos'
                  onSearchChange={onSearchChange}
                  queryParams={queryParams}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`top-bar-helper ${!showSearch ? "hidden-search" : ""} ${
          showCouponBanner ? "show-coupon-banner" : ""
        }`}
      ></div>
    </>
  );
};

NavbarSectionLayout.propTypes = {
  className: PropTypes.string,
  onSearchChange: PropTypes.func,
  showSearch: PropTypes.bool,
  showLogin: PropTypes.bool
};

NavbarSectionLayout.defaultProps = {
  className: "",
  onSearchChange: () => {},
  showSearch: true,
  showLogin: true
};

export { NavbarSectionLayout };
