import React from "react";
import { NavLink, Link } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { CurrencyDropdownLayout } from "../currency-dropdown";
import { NavbarSearchLayout } from "../navbar-search";
import { HOME_PATH } from "../../../routing/Paths";
import PropTypes from "prop-types";
import { Session } from "../../../state/utils/session";
import "./styles.scss";

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
    <div className={`NavbarSectionLayout ${className}`}>
      <div className="top-bar container m-0 mx-md-auto p-0 row align-items-center">
        <div className="top-bar__left-side col-4 p-0">
          <div className="dropdown">
            <button
              className="btn top-bar__dropdown-button"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => setDropdownMenuIsOpen(!dropdownMenuIsOpen)}
            >
              <i className="fa fa-bars" />
            </button>
            <div
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
              <Link className="dropdown-item" to={PATHS.ROOT_PATH}>
                ¿Cómo funciona?
              </Link>
              <NavLink
                className="dropdown-item"
                activeClassName="active"
                to={PATHS.TRENDING}
              >
                Tendencias
              </NavLink>
              {!isLogged ? (
                <>
                  <NavLink
                    className="dropdown-item"
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
        <div className="top-bar__center-side col-4 text-center p-0">
          <NavLink to={HOME_PATH} className="top-bar__logo-link">
            <img
              className="top-bar__logo"
              src="/assets/img/logo-color-1.png"
              alt="Famosos Logo"
            />
          </NavLink>
        </div>
        <div className="top-bar__right-side col-4 p-0">
          <div className="top-bar__currency ml-auto mr-2">
            <CurrencyDropdownLayout />
          </div>
        </div>
        {showSearch ? (
          <div className="col-12 pt-3 px-0">
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
      <div
        className={`top-bar-helper ${!showSearch ? "hidden-search" : ""}`}
      ></div>
    </div>
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
