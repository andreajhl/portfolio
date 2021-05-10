import React, { Component } from "react";
import * as PATHS from "../../../routing/Paths";
import { description, version } from "../../../../../package.json";
import { withRouter } from "next/router";
import { Link } from "../../common/routing/link";
import { FormattedMessage } from "react-intl";

class FooterLayout extends Component {
  constructor(props) {
    super(props);

    this.goToFamososTwitter = this.goToFamososTwitter.bind(this);
    this.goToFamososFacebook = this.goToFamososFacebook.bind(this);
    this.goToFamososInstagran = this.goToFamososInstagran.bind(this);
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
                  <FormattedMessage
                    defaultMessage="Es una compañía dedicada a crear tecnologías <br></br> que conecten personalidades con su fan base."
                    values={{
                      br: (chunks) => <br></br>
                    }}
                  />
                </div>
                <p className="mb-0">
                  {description} v{version}
                </p>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-two">
                <div className="col-title">
                  <FormattedMessage defaultMessage=" ¿Eres una celebridad o influencer?" />
                </div>
                <div className="col-button">
                  <Link href={PATHS.CELEBRITY_REQUEST}>
                    <button className="btn btn-apply">
                      <FormattedMessage defaultMessage="Aplica como Famoso" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-4 col-three">
                <ul className="list-inline">
                  <li className="list-inline-item mr-3 font-weight-bold">
                    <FormattedMessage defaultMessage="Síguenos en Redes" />
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
                <ul className="list-inline links-lists">
                  <li className="list-inline-item mr-2 cursor-pointer font-weight-bold">
                    <Link
                      href={PATHS.FAQS_PATH}
                      className="small link text-decoration-none"
                    >
                      <FormattedMessage defaultMessage="FAQ's" />
                    </Link>
                  </li>
                  <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                    <Link
                      href={PATHS.TERMS_PATH}
                      className="small link text-decoration-none"
                    >
                      <FormattedMessage defaultMessage="Términos y Condiciones" />
                    </Link>
                  </li>
                  <li className="list-inline-item mr-2 mt-1 cursor-pointer font-weight-bold">
                    <Link
                      href={PATHS.POLICIES_PATH}
                      className="small link text-decoration-none"
                    >
                      <FormattedMessage defaultMessage="Privacidad" />
                    </Link>
                  </li>
                  <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                    <a
                      className="small text-decoration-none link"
                      href="https://jobs.lever.co/famosos"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Trabaja con nosotros
                    </a>
                  </li>
                </ul>
                <div className="col-copyright">
                  &copy;{" "}
                  <FormattedMessage defaultMessage="2020 Famosos, Inc. All Rights Reserved." />
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
