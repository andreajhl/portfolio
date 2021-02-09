import React, { Component } from "react";

import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class SessionRequiredToCommentLayout extends Component {
  goToSignIn() {
    localStorage.setItem("finalRedirect", history.location.pathname);
    history._pushRoute(PATHS.SIGN_IN_PATH);
  }

  goToSignUp() {
    localStorage.setItem("finalRedirect", history.location.pathname);
    history._pushRoute(PATHS.SIGN_UP_PATH);
  }

  render() {
    return (
      <div className="SessionRequiredToCommentLayout">
        <h5 className="font-weight-bold">
          Inicia sesión para agregar un comentario
        </h5>
        <button
          className="btn btn-sm btn-primary mt-2"
          onClick={this.goToSignIn}
        >
          Iniciar sesión
        </button>
        <span
          className="ml-2 mr-2"
          style={{ position: "relative", top: "6px" }}
        >
          ¿Aún no tienes cuenta?
          <b
            className="ml-2 mr-2"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={this.goToSignUp}
          >
            Crea una cuenta
          </b>
        </span>
      </div>
    );
  }
}

export { SessionRequiredToCommentLayout };
