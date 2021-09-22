import React, { useState } from "react";
import { NavLink } from "react-app/src/components/common/routing";
import UAParser from "ua-parser-js";
import * as PATHS from "../../../routing/Paths";
import { sendDropdownLinkAnalyticsData } from "../navbar-section/index";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";
import LoginButton from "../../containers/login-button/login-button";
import { FormattedMessage } from "react-intl";
import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import Popup from "reactjs-popup";
import { HorizontalMenuIcon } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import { REFERRALS_INVITE } from "constants/paths";
import Maybe from "../../common/helpers/maybe";

const { type, vendor } = new UAParser().getDevice();
// const isAppleDevice = vendor === "Apple";
// const isHuaweiDevice = vendor === "Huawei";
const shouldRenderDownloadAppLink = false;
// type === "mobile" && !isAppleDevice && !isHuaweiDevice;

export const DropdownMenuLayout = ({ isLogged }) => {
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  return (
    <div>
      <Popup
        arrow={false}
        position="bottom right"
        trigger={
          <button
            className={`btn btn-outline ${styles.OpenMenuButton}`}
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="dropdown toggle button"
          >
            <HorizontalMenuIcon />
          </button>
        }
      >
        <div
          onClick={({ target }) =>
            sendDropdownLinkAnalyticsData("CLICK", target)
          }
          aria-labelledby="dropdownMenuButton"
          className={styles.DropdownMenuLayoutWrapper}
        >
          {isLogged ? (
            <>
              <NavLink
                className={styles.NavLinkItem}
                activeClassName={styles.NavLinkItemActive}
                to={PATHS.CLIENT_PROFILE}
              >
                <FormattedMessage defaultMessage="Mi perfil" />
              </NavLink>
              <NavLink
                className={styles.NavLinkItem}
                activeClassName={styles.NavLinkItemActive}
                to={PATHS.CLIENT_HIRINGS}
              >
                <FormattedMessage defaultMessage="Mis contrataciones" />
              </NavLink>
              <NavLink
                className={styles.NavLinkItem}
                activeClassName={styles.NavLinkItemActive}
                to={PATHS.FEED_SUBSCRIPTION}
              >
                <FormattedMessage defaultMessage="Mis suscripciones" />
              </NavLink>
            </>
          ) : null}
          {/* <a className={styles.NavLinkItem} href={PATHS.LANDING_PATH}>
          ¿Como funciona?
        </a> */}
          <NavLink
            className={styles.NavLinkItem}
            activeClassName={styles.NavLinkItemActive}
            to={PATHS.BLOG}
          >
            <FormattedMessage defaultMessage="Blog" />
          </NavLink>
          {!isLogged ? (
            <>
              <LoginButton className={`${styles.DropDownItem}`} />
              <LoginButton
                className={`${styles.DropDownItem}`}
                text="Registrarme"
              />
            </>
          ) : null}
          <NavLink
            className={styles.NavLinkItem}
            activeClassName={styles.NavLinkItemActive}
            to={PATHS.CELEBRITY_REQUEST}
          >
            <FormattedMessage defaultMessage="Aplicar como Famoso" />
          </NavLink>
          <Maybe it={isLogged}>
            <NavLink
              className={styles.NavLinkItem}
              activeClassName={styles.NavLinkItemActive}
              to={REFERRALS_INVITE}
            >
              <FormattedMessage defaultMessage="Invitar a un amigo" />
            </NavLink>
          </Maybe>
          {shouldRenderDownloadAppLink ? (
            <a
              href="market://details?id=com.famosos.users"
              target="_top"
              className="text-decoration-none"
            >
              <LessImportantCallToActionButton
                width="100%"
                className={styles.CallToActionButtonDownloadApp}
                fontSize="0.875rem"
              >
                <FormattedMessage defaultMessage="Descargar app de Android" />
              </LessImportantCallToActionButton>
            </a>
          ) : null}
        </div>
      </Popup>
    </div>
  );
};
