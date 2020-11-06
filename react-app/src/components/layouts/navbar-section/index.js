import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { CurrencyDropdownLayout } from "../currency-dropdown";
import { NavbarSearchLayout } from "../navbar-search";
import "./styles.scss";

const NavbarSectionLayout = (props) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  return (
    <div className="NavbarSectionLayout">
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
              onClick={() =>
                setDropdownIsOpen((dropdownIsOpen) => !dropdownIsOpen)
              }
            >
              <i className="fa fa-bars" />
            </button>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
              style={
                dropdownIsOpen
                  ? {
                      display: "block",
                    }
                  : {}
              }
            >
              <NavLink
                className="dropdown-item"
                activeClassName="active"
                to={PATHS.CLIENT_HIRINGS}
              >
                Mis contrataciones
              </NavLink>
              <NavLink
                className="dropdown-item"
                activeClassName="active"
                to={PATHS.CLIENT_PROFILE}
              >
                Mi perfil
              </NavLink>
              <a className="dropdown-item" href="#" onClick={console.log}>
                ¿Cómo funciona?
              </a>
              <NavLink
                className="dropdown-item"
                activeClassName="active"
                to={PATHS.TRENDING}
              >
                Tendencias
              </NavLink>
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
          <a href="#" className="top-bar__logo-link">
            <img
              className="top-bar__logo"
              src="/assets/img/logo-color-1.png"
              alt="Famosos Logo"
            />
          </a>
        </div>
        <div className="top-bar__right-side col-4 p-0">
          <div className="top-bar__currency ml-auto mr-2">
            <CurrencyDropdownLayout />
          </div>
        </div>
        <div className="col-12 pt-3 px-0">
          <div className="d-block top-bar__search-sm">
            <NavbarSearchLayout
              searchLabel="Buscar famosos"
              /* onSearchChange={this.props.onSearchChange}
              autoFocus={this.state.showSearch} */
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { NavbarSectionLayout };
