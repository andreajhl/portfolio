import React, { Component } from "react";
import "./styles.scss";
import { Session } from "../../../state/utils/session";
import { ResetPasswordForm } from "../../containers";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import MetaTags from "react-meta-tags";

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginWithMail: false
    };

    this.onChangeSignInType = this.onChangeSignInType.bind(this);
    this.goToRoot = this.goToRoot.bind(this);
  }

  componentWillMount() {
    const session = new Session();
    session.checkSession();
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("RESET_PASSWORD_PAGE_VIEW", this.props.match);
  }

  onChangeSignInType(type) {
    switch (type) {
      case "email":
        this.setState({ loginWithMail: true });
        break;
      case "cellphone":
      default:
        this.setState({ loginWithMail: false });
        break;
    }
  }

  goToRoot() {
    history._pushRoute(PATHS.HOME_PATH);
  }

  render() {
    return (
      <>
        <MetaTags>
          <title>Famosos.com - Recupera tu contraseña</title>
          <meta
            name="description"
            content="Recupera la contraseña de tu cuenta de Famosos.com. Reserva tu video y disfruta de experiencias únicas."
          />
        </MetaTags>

        <PageContainer applyFetchCelebrities={false} showFooter={false}>
          <div className="SignInPage">
            <div className="section">
              <div className="auth-container">
                <div className="logo">
                  <img src={"/assets/img/logo-color.png"} alt="famosos-logo" />
                </div>
                <div className="custom-form">
                  <ResetPasswordForm />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }
}

export { ResetPasswordPage };
