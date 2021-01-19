import React from "react";
import "./styles.scss";
import { PageContainer } from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { NavLink } from "react-router-dom";
import { FourZeroFourCelebritiesSectionsLayout } from "../../layouts/404-celebrities-sections";
import { CallToActionButton } from "../../layouts/call-to-action-button";

const FourZeroFourCelebrityProfile = ({ match }) => {
  return (
    <>
      <PageContainer applyFetchCelebrities={false} showFooter>
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
                {match.params.celebrity_username}
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
        <div className="container py-4">
          <h3 className="font-weight-bold text-center">
            Quizás pueda <br className="d-sm-none" /> interesarte
          </h3>
        </div>
        <FourZeroFourCelebritiesSectionsLayout />
        <div className="container pb-4 pt-2 text-center">
          <NavLink to={ROUTING_PATHS.HOME_PATH}>
            <CallToActionButton
              className="FourZeroFourCelebrityProfile__see-more-button"
              fontSize="1.15rem"
            >
              Ver más famosos
            </CallToActionButton>
          </NavLink>
        </div>
      </PageContainer>
    </>
  );
};

export { FourZeroFourCelebrityProfile };
