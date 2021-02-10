import React, { Component } from "react";
import { NavLink } from "react-app/src/components/common/routing";

import * as PATHS from "../../../routing/Paths";

class CookiesConsent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBanner: localStorage.getItem("hasAcceptedCookiesConsent") !== "true"
    };
  }

  hideBanner = () => {
    localStorage.setItem("hasAcceptedCookiesConsent", true);
    this.setState({
      hideBanner: true
    });
  };

  removeCookieConsent = ({ propertyName }) => {
    if (propertyName === "opacity") {
      this.setState({ showBanner: false });
    }
  };

  render() {
    return this.state.showBanner ? (
      <div
        className={`cookies-consent ${this.state.hideBanner ? "hidden" : ""}`}
        onTransitionEnd={this.removeCookieConsent}
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
            onClick={this.hideBanner}
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
    ) : null;
  }
}

// Set defaultProps
CookiesConsent.defaultProps = {};
export { CookiesConsent };
