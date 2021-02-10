import React, { Component } from "react";

import { PageContainer } from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";

class AuthFlowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goToSignUp = () => {
    history._pushRoute(
      ROUTING_PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(
        ":form",
        "email-form"
      )
    );
  };

  goToSignIn = () => {
    history._pushRoute(
      ROUTING_PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(
        ":form",
        "email-form"
      )
    );
  };

  render() {
    return (
      <>
        <MetaTags>
          <title>Famosos.com - Iniciar Sesión</title>
          <meta
            name="description"
            content="Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
          />
        </MetaTags>

        <PageContainer applyFetchCelebrities={false} showFooter={false}>
          <div className="SignInPage">
            <div className="section">
              <div className="auth-container mx-auto text-center">
                <div className={"p-2"}>
                  <h6 className="text-center mb-4">
                    ¡Hola, para hacer una compra debes ingresar a tu cuenta!
                  </h6>
                </div>
                <div>
                  <button
                    className={"btn btn-primary mb-3"}
                    style={{ width: "200px" }}
                    onClick={this.goToSignUp}
                  >
                    Soy nuevo
                  </button>
                </div>
                <button
                  className="btn btn-flat font-weight-lighter"
                  onClick={this.goToSignIn}
                >
                  Ya tengo una cuenta
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }
}

export { AuthFlowPage };
