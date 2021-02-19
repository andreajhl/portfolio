import React, { useEffect, useState } from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { HAS_ACCEPTED_COOKIES_CONSENT } from "react-app/src/constants/localStorageKeys";
import getWindow from "react-app/src/utils/getWindow";
import Maybe from "../../common/helpers/maybe";
import * as PATHS from "../../../routing/Paths";

const CookiesConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerIsHidden, setBannerIsHidden] = useState(false);

  useEffect(() => {
    setShowBanner(
      localStorage.getItem(HAS_ACCEPTED_COOKIES_CONSENT) !== "true"
    );
  }, []);

  const hideBanner = () => {
    getWindow()?.localStorage?.setItem?.(HAS_ACCEPTED_COOKIES_CONSENT, true);
    setBannerIsHidden(true);
  };

  const removeCookieConsent = ({ propertyName }) => {
    if (propertyName === "opacity") {
      setShowBanner(false);
    }
  };

  return (
    <Maybe it={showBanner}>
      <div
        className={`cookies-consent ${bannerIsHidden ? "hidden" : ""}`}
        onTransitionEnd={removeCookieConsent}
      >
        <div className="cookies-consent__text">
          En nuestro sitio web utilizamos cookies propias y de terceros para
          mejorar la experiencia de usuario, rendimiento, análisis y otro fines.
          Al hacer clic en aceptar o utilizar nuestro sitio, estarás aceptando
          el uso de estas cookies.
        </div>
        <div className="cookies-consent__options">
          <button
            className="cookies-consent__accept-button mr-3"
            onClick={hideBanner}
          >
            Aceptar
          </button>
          <NavLink
            to={PATHS.POLICIES_PATH}
            className="cookies-consent__terms-link"
          >
            Ver las políticas de privacidad
          </NavLink>
        </div>
      </div>
    </Maybe>
  );
};

export { CookiesConsent };
