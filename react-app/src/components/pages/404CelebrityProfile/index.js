import React, { useEffect } from "react";
import "./styles.scss";
import { PageContainer } from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { NavLink, Redirect } from "react-router-dom";
import { FourZeroFourCelebritiesSectionsLayout } from "../../layouts/404-celebrities-sections";
import { CallToActionButton } from "../../layouts/call-to-action-button";
import { get } from "../../../state/ducks/celebrities/actions";
import { connect } from "react-redux";

const FourZeroFourCelebrityProfile = ({
  match,
  celebrity,
  getCelebrity,
  isLoading
}) => {
  const celebrityUsername = match.params.celebrity_username;
  const previousUsername = celebrity?.username;

  useEffect(() => {
    if (celebrityUsername !== previousUsername) {
      getCelebrity(celebrityUsername);
    }
  }, [celebrityUsername, getCelebrity, previousUsername]);

  return (
    <>
      <PageContainer applyFetchCelebrities={false} showFooter>
        <div className="FourZeroFourCelebrityProfile">
          {previousUsername === celebrityUsername ? (
            <Redirect
              to={ROUTING_PATHS.CELEBRITY_PROFILE.replace(
                ":celebrity_username",
                previousUsername
              )}
            />
          ) : null}
          {!isLoading ? (
            <>
              <header className="FourZeroFourCelebrityProfile__banner container">
                <img
                  src="/assets/img/index-header-backeground.png"
                  alt="Famosa con teléfono"
                  className="FourZeroFourCelebrityProfile__banner-img order-1 order-md-0"
                />
                <div className="FourZeroFourCelebrityProfile__banner-content p-4">
                  <h3 className="FourZeroFourCelebrityProfile__banner-title order-1 order-md-0">
                    No se encontró un <br />
                    famoso con el usuario <br className="d-none d-lg-inline" />
                    <span className="FourZeroFourCelebrityProfile__banner-username">
                      {celebrityUsername}
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
                <h3 className="font-weight-bold text-center mb-0">
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
            </>
          ) : (
            <div style={{ height: "100vh" }} />
          )}
        </div>
      </PageContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data
});
// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: get
};

const _FourZeroFourCelebrityProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(FourZeroFourCelebrityProfile);

export { _FourZeroFourCelebrityProfile as FourZeroFourCelebrityProfile };
