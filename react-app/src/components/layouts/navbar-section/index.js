import React from "react";
import { NavLink, Link } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { CurrencyDropdownLayout } from "../currency-dropdown";
import { NavbarSearchLayout } from "../navbar-search";
import { HOME_PATH } from "../../../routing/Paths";
import PropTypes from "prop-types";
import { Session } from "../../../state/utils/session";
import * as GTM from "../../../state/utils/gtm";
import "./styles.scss";

const sendDropdownLinkAnalyticsData = (eventName, target) => {
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
  setDropdownMenuIsOpen
}) => {
  const isLogged = new Session().getSession();
  return (
    <>
      <div className={`NavbarSectionLayout ${className}`}>
        <div className="top-bar container mx-auto p-0 row">
          <div className="top-bar__left-side col-4 p-0">
            <div
              className={`dropdown ${
                dropdownMenuIsOpen ? "dropdown-menu-is-open" : ""
              }`}
            >
              <button
                className="btn top-bar__dropdown-button"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setDropdownMenuIsOpen(!dropdownMenuIsOpen)}
              >
                <i
                  className={`fa fa-${dropdownMenuIsOpen ? "times" : "bars"}`}
                />
              </button>
              <div
                onMouseOver={({ target }) =>
                  sendDropdownLinkAnalyticsData("HOVER", target)
                }
                onClick={({ target }) =>
                  sendDropdownLinkAnalyticsData("CLICK", target)
                }
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={
                  dropdownMenuIsOpen
                    ? {
                        display: "block"
                      }
                    : {}
                }
              >
                {isLogged ? (
                  <>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to={PATHS.CLIENT_PROFILE}
                    >
                      Mi perfil
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to={PATHS.CLIENT_HIRINGS}
                    >
                      Mis contrataciones
                    </NavLink>
                  </>
                ) : null}
                <a className="dropdown-item" href={PATHS.LANDING_PATH}>
                  ¿Cómo funciona?
                </a>
                <NavLink
                  className="dropdown-item d-md-none"
                  activeClassName="active"
                  to={PATHS.TRENDING}
                >
                  Tendencias
                </NavLink>
                {!isLogged ? (
                  <>
                    <NavLink
                      className="dropdown-item d-md-none"
                      activeClassName="active"
                      to={PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(
                        ":form",
                        "email-form"
                      )}
                    >
                      Ingresar
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to={PATHS.SIGN_UP_PATH}
                    >
                      Registrarme
                    </NavLink>
                  </>
                ) : null}
                <NavLink
                  className="dropdown-item"
                  activeClassName="active"
                  to={PATHS.CELEBRITY_REQUEST}
                >
                  Aplicar
                </NavLink>
              </div>
            </div>
          </div>
          <div className="top-bar__center-side col-4 text-center p-0 pt-2">
            <NavLink
              to={HOME_PATH}
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
          <div className="top-bar__right-side col-4 p-0 row m-0">
            {!isLogged ? (
              <div className="col d-none d-md-flex align-items-center">
                <NavLink
                  className="btn btn-outline-primary ml-auto btn-sm top-bar__login-btn"
                  activeClassName=""
                  to={PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(
                    ":form",
                    "email-form"
                  )}
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
            <div className="top-bar__currency mr-2 ml-auto">
              <CurrencyDropdownLayout />
            </div>
          </div>
          {showSearch ? (
            <div className="col-12 pt-2 px-0">
              <div className="d-block top-bar__search-sm">
                <NavbarSearchLayout
                  searchLabel="Buscar famosos"
                  onSearchChange={onSearchChange}
                  queryParams={queryParams}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`top-bar-helper ${!showSearch ? "hidden-search" : ""}`}
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
