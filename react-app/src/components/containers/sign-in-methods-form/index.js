import React, { Component } from "react";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class SignInMethodsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMethods: false
    };

    this.showMethods = this.showMethods.bind(this);
    this.goToSignInWithWhatsApp = this.goToSignInWithWhatsApp.bind(this);
    this.goToSignInWithCellphone = this.goToSignInWithCellphone.bind(this);
    this.goToSignInWithEmail = this.goToSignInWithEmail.bind(this);
  }

  showMethods() {
    this.setState({
      showMethods: true
    });
  }

  goToSignInWithWhatsApp() {
    if (this.props.signUp) {
      history._pushRoute(
        PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "whatsapp-form")
      );
    } else {
      history._pushRoute(
        PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "whatsapp-form")
      );
    }
  }

  goToSignInWithCellphone() {
    if (this.props.signUp) {
      history._pushRoute(
        PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "cellphone-form")
      );
    } else {
      history._pushRoute(
        PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "cellphone-form")
      );
    }
  }

  goToSignInWithEmail() {
    if (this.props.signUp) {
      history._pushRoute(
        PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
      );
    } else {
      history._pushRoute(
        PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
      );
    }
  }

  render() {
    return (
      <div className="SignInMethodsForm">
        {this.props.cellphone && (
          <button
            className="sign-in-with-cellphone-button text-center"
            onClick={this.goToSignInWithCellphone}
          >
            <i className="fa fa-sms mr-3 ml-2" />
            <span>Ingresar con mi celular</span>
          </button>
        )}
        {this.props.whatsapp && (
          <>
            {/*<button*/}
            {/*    className="sign-in-with-whatsapp-button text-center"*/}
            {/*    onClick={this.goToSignInWithWhatsApp}*/}
            {/*>*/}
            {/*    <img className="cursor-pointer mr-3 ml-2" src="/assets/img/whatsapp-black.svg"/>*/}
            {/*    <span>Ingresar con mi WhatsApp</span>*/}
            {/*</button>*/}
          </>
        )}
        {this.props.email && (
          <button
            className="sign-in-with-email-button text-center"
            onClick={this.goToSignInWithEmail}
          >
            <i className="fa fa-envelope mr-3 ml-2" />
            <span>Ingresar con mi correo</span>
          </button>
        )}
      </div>
    );
  }
}

// defaultProps
SignInMethodsForm.defaultProps = {
  whatsapp: false,
  cellphone: false,
  email: false,
  signUp: false
};

export { SignInMethodsForm };
