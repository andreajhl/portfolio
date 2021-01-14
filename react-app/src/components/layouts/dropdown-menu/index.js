import React from "react";
import { NavLink } from "react-router-dom";
import * as PATHS from "../../../routing/Paths";
import { sendDropdownLinkAnalyticsData } from "../navbar-section/index";
import "./styles.scss";

export const DropdownMenuLayout = ({
  dropdownMenuIsOpen,
  setDropdownMenuIsOpen,
  isLogged
}) => {
  return (
    <div
      className={`DropdownMenuLayout dropdown ${
        dropdownMenuIsOpen ? "dropdown-menu-is-open" : ""
      }`}
    >
      <button
        className="btn DropdownMenuLayout__dropdown-button"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        aria-label="dropdown toggle button"
        onClick={() => setDropdownMenuIsOpen(!dropdownMenuIsOpen)}
      >
        <i className={`fa fa-${dropdownMenuIsOpen ? "times" : "bars"}`} />
      </button>
      <div
        onMouseOver={({ target }) =>
          sendDropdownLinkAnalyticsData("HOVER", target)
        }
        onClick={({ target }) => sendDropdownLinkAnalyticsData("CLICK", target)}
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
          ¿Como funciona?
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
  );
};
