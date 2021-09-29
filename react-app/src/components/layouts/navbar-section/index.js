import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { CurrencyDropdownLayout } from "../currency-dropdown";
import { NavbarSearchLayout } from "../navbar-search";
import { ROOT_PATH } from "../../../routing/Paths";
import PropTypes from "prop-types";
import * as GTM from "../../../state/utils/gtm";
import { DropdownMenuLayout } from "../dropdown-menu";
import { useAuth } from "lib/famosos-auth";
import LoginButton from "../../containers/login-button/login-button";
import Maybe from "../../common/helpers/maybe";
import { useIntl, defineMessage } from "react-intl";
import LangDropdown from "../../containers/lang-dropdown";
import { UserStarsLink } from "desktop-app/components/user-stars-link";
import { ReferralFirstBuyDiscountBanner } from "../referral-first-buy-discount-banner";
import isReferralWithFirstBuyDiscount from "lib/utils/isReferralWithFirstBuyDiscount";
// import { UserNotificationsPopup } from "../user-notifications-popup";

export const sendDropdownLinkAnalyticsData = (eventName, target) => {
  if (!target.matches("a")) return;
  GTM.tagManagerDataLayer(eventName + "_DROPDOWN_MENU_LINK", {
    widget: "NavbarSectionLayout",
    path: window.location.pathname,
    anchorInnerText: target.innerText,
    anchorHref: target.pathname,
  });
};

const registerLogoLinkClick = () =>
  GTM.tagManagerDataLayer("CLICK_LOGO_LINK", {
    widget: "NavbarSectionLayout",
    path: window.location.pathname,
  });

const messageSearchLabel = defineMessage({
  defaultMessage: "Buscar famosos",
});

const NavbarSectionLayout = ({
  className,
  onSearchChange,
  showSearch,
  queryParams,
  forceHeadroomUpdate,
}) => {
  const { isLoading, isAuthenticated, user } = useAuth();
  const intl = useIntl();

  const showStarsLink = typeof user?.stars !== "undefined";
  const showReferralDiscountBanner = isReferralWithFirstBuyDiscount(user);

  return (
    <>
      <div className={`NavbarSectionLayout ${className}`}>
        <div className="top-bar container mx-auto p-0 row">
          <div className="top-bar__left-side col-4">
            <NavLink
              to={ROOT_PATH}
              className="top-bar__logo-link"
              onClick={registerLogoLinkClick}
            >
              <img
                className="top-bar__logo"
                src="/assets/img/famosos-logo.svg"
                alt="Famosos Logo"
              />
            </NavLink>
          </div>
          <div className="top-bar__right-side">
            <Maybe it={!isAuthenticated}>
              <div className="col d-none d-md-flex  align-items-center">
                <LoginButton
                  className={
                    "btn btn-outline-primary ml-auto btn-sm top-bar__login-btn mt-1"
                  }
                />
              </div>
            </Maybe>
            {/* <div className="top-bar__lang  mr-4 ml-auto">
              <UserNotificationsPopup />
            </div> */}
            <div className="top-bar__lang  mr-4">
              <LangDropdown />
            </div>
            <div className="top-bar__currency mr-4">
              <CurrencyDropdownLayout />
            </div>
            <Maybe it={showStarsLink}>
              <div className="top-bar__currency mr-4">
                <UserStarsLink />
              </div>
            </Maybe>
            <div className="top-bar__lang  mr-4">
              <DropdownMenuLayout isLogged={!isLoading && isAuthenticated} />
            </div>
          </div>
        </div>
        <Maybe it={showReferralDiscountBanner}>
          <ReferralFirstBuyDiscountBanner onCollapseEnd={forceHeadroomUpdate} />
        </Maybe>
        <Maybe it={showSearch}>
          <div className="col-12 pt-3 px-0">
            <div className="d-block top-bar__search-sm">
              <NavbarSearchLayout
                searchLabel={intl.formatMessage(messageSearchLabel)}
                onSearchChange={onSearchChange}
                queryParams={queryParams}
              />
            </div>
          </div>
        </Maybe>
      </div>
    </>
  );
};

NavbarSectionLayout.propTypes = {
  className: PropTypes.string,
  onSearchChange: PropTypes.func,
  showSearch: PropTypes.bool,
  showLogin: PropTypes.bool,
};

NavbarSectionLayout.defaultProps = {
  className: "",
  onSearchChange: () => {},
  showSearch: true,
  showLogin: true,
};

export { NavbarSectionLayout };
