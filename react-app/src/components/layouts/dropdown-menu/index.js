import React from "react";
import { NavLink } from "react-router-dom";
import UAParser from "ua-parser-js";
import * as PATHS from "../../../routing/Paths";
import { sendDropdownLinkAnalyticsData } from "../navbar-section/index";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";
import "./styles.scss";

const { type, vendor } = new UAParser().getDevice();
const isAppleDevice = vendor === "Apple";
const isHuaweiDevice = vendor === "Huawei";
const shouldRenderDownloadAppLink =
  type === "mobile" && !isAppleDevice && !isHuaweiDevice;

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
        className="btn DropdownMenuLayout__dropdown-button ml-2"
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
          className="dropdown-item"
          activeClassName="active"
          to={PATHS.BLOG}
        >
          Blog
        </NavLink>
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
        {shouldRenderDownloadAppLink ? (
          <a
            href="market://details?id=com.famosos.users"
            target="_top"
            className="text-decoration-none"
          >
            <LessImportantCallToActionButton
              className="dropdown-item border-0"
              width="100%"
              fontSize="0.875rem"
            >
              Descargar app de Android
            </LessImportantCallToActionButton>
          </a>
        ) : null}
      </div>
    </div>
  );
};
