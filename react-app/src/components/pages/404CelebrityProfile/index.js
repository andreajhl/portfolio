import React, { Component } from "react";
import "./styles.scss";
import { PageContainer } from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { NavLink } from "react-router-dom";

class FourZeroFourCelebrityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <PageContainer applyFetchCelebrities={false} showFooter={false}>
          <header className="FourZeroFourCelebrityProfile__banner container">
            <img
              src="/assets/img/index-header-backeground.png"
              alt="Famosa con teléfono"
              className="FourZeroFourCelebrityProfile__banner-img order-1 order-md-0"
            />
            <div className="FourZeroFourCelebrityProfile__banner-content p-4">
              <h3 className="FourZeroFourCelebrityProfile__banner-title order-1 order-md-0">
                No se encontró un <br />
                famoso con el usuario{" "}
                <span className="FourZeroFourCelebrityProfile__banner-username">
                  {this.props.match.params.celebrity_username}
                </span>
              </h3>
              <NavLink
                to={ROUTING_PATHS.HOME_PATH}
                className="FourZeroFourCelebrityProfile__banner-home-link"
              >
                <i className="fa fa-arrow-left FourZeroFourCelebrityProfile__banner-arrow-left" />{" "}
                Volver al inicio
              </NavLink>
            </div>
          </header>
        </PageContainer>
      </>
    );
  }
}

export { FourZeroFourCelebrityProfile };
