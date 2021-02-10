import React, { Component } from "react";
import * as PATHS from "../../../routing/Paths";
import { description, version } from "../../../../../package.json";
import { withRouter } from "next/router";

class FooterLayout extends Component {
  constructor(props) {
    super(props);

    this.goToFAQs = this.goToFAQs.bind(this);
    this.goToPolicies = this.goToPolicies.bind(this);
    this.goToTerms = this.goToTerms.bind(this);
    this.goToFamososTwitter = this.goToFamososTwitter.bind(this);
    this.goToFamososFacebook = this.goToFamososFacebook.bind(this);
    this.goToFamososInstagran = this.goToFamososInstagran.bind(this);
    this.goToApply = this.goToApply.bind(this);
  }

  goToFAQs() {
    this.props.router.push(PATHS.FAQS_PATH);
  }

  goToPolicies() {
    this.props.router.push(PATHS.POLICIES_PATH);
  }

  goToTerms() {
    this.props.router.push(PATHS.TERMS_PATH);
  }

  goToFamososTwitter() {
    window.open("https://www.twitter.com/famosos", "_blank").focus();
  }

  goToFamososFacebook() {
    window.open("https://www.facebook.com/contratafamosos", "_blank").focus();
  }

  goToFamososInstagran() {
    window.open("https://www.instagram.com/famosos/", "_blank").focus();
  }

  goToApply() {
    this.props.router.push(PATHS.CELEBRITY_REQUEST);
  }

  render() {
    return (
      <div className="FooterLayout">
        <footer className="footer">
          <div
            className="container"
            style={{ maxWidth: "1300px", zoom: "0.9" }}
          >
            <div className="row">
              <div className="col-12 col-md-4 col-lg-4 col-one">
                <div className="col-image">
                  <img
                    className="text-dark"
                    src="/assets/img/famosos-white-logo.svg"
                    alt="Logo"
                  />
                </div>
                <div className="col-description">
                  Es una compañía dedicada a crear tecnologías
                  <br />
                  que conecten personalidades con su fan base.
                </div>
                <p className="mb-0">
                  {description} v{version}
                </p>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-two">
                <div className="col-title">
                  ¿Eres una celebridad o influencer?
                </div>
                <div className="col-button">
                  <button className="btn btn-apply" onClick={this.goToApply}>
                    Aplica como Famoso
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-three">
                <ul className="list-inline">
                  <li className="list-inline-item mr-3 font-weight-bold">
                    Síguenos en Redes
                  </li>
                  <li
                    className="list-inline-item mr-3"
                    onClick={this.goToFamososFacebook}
                  >
                    <img
                      className="cursor-pointer"
                      src="/assets/img/facebook-white.svg"
                      width="30px"
                      alt="Facebook"
                    />
                  </li>
                  <li
                    className="list-inline-item mr-3"
                    onClick={this.goToFamososInstagran}
                  >
                    <img
                      className="cursor-pointer"
                      src="/assets/img/instagram-white.svg"
                      width="30px"
                      alt="Instagram"
                    />
                  </li>
                </ul>
                <ul className="list-inline">
                  <li className="list-inline-item mr-2 cursor-pointer font-weight-bold">
                    <span className="small" onClick={this.goToFAQs}>
                      FAQ's
                    </span>
                  </li>
                  <li className="list-inline-item ml-2 mr-2 cursor-pointer font-weight-bold">
                    <span className="small" onClick={this.goToPolicies}>
                      Privacidad
                    </span>
                  </li>
                  <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                    <span className="small" onClick={this.goToTerms}>
                      Términos y Condiciones
                    </span>
                  </li>
                </ul>
                <div className="col-copyright">
                  &copy; 2020 Famosos, Inc. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const _FooterLayout = withRouter(FooterLayout);

export { _FooterLayout as FooterLayout };
