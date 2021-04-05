import React from "react";
import { PageContainer } from "../../layouts/page-container";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { NavLink } from "../../common/routing";
import { FourZeroFourCelebritiesSectionsLayout } from "../../layouts/404-celebrities-sections";
import { CallToActionButton } from "../../layouts/call-to-action-button";
import { FormattedMessage } from "react-intl";

const FourZeroFourCelebrityProfile = ({ celebrityUsername }) => {
  return (
    <PageContainer applyFetchCelebrities={false} showFooter>
      <div className="FourZeroFourCelebrityProfile">
        <header className="FourZeroFourCelebrityProfile__banner container">
          <img
            src="/assets/img/index-header-backeground.png"
            alt="Famosa con teléfono"
            className="FourZeroFourCelebrityProfile__banner-img order-1 order-md-0"
          />
          <div className="FourZeroFourCelebrityProfile__banner-content p-4">
            <h3 className="FourZeroFourCelebrityProfile__banner-title order-1 order-md-0">
              <FormattedMessage
                defaultMessage="No se encontró un {breakLine} famoso con el usuario <br></br> <span>{celebrityUsername}</span>"
                values={{
                  br: () => <br className="d-none d-lg-inline"></br>,
                  breakLine: <br></br>,
                  span: (chunks) => (
                    <span className="FourZeroFourCelebrityProfile__banner-username">
                      {chunks}
                    </span>
                  ),
                  celebrityUsername: celebrityUsername
                }}
              />
            </h3>
            {/*  */}
            {/*  */}
            <NavLink
              to={ROUTING_PATHS.HOME_PATH}
              className="FourZeroFourCelebrityProfile__banner-home-link"
            >
              <i className="fa fa-arrow-left FourZeroFourCelebrityProfile__banner-arrow-left" />{" "}
              <FormattedMessage defaultMessage=" Volver al inicio" />
            </NavLink>
          </div>
        </header>
        <div className="container py-4">
          <h3 className="font-weight-bold text-center mb-0">
            <FormattedMessage
              defaultMessage="Quizás pueda <br></br> interesarte"
              values={{
                br: () => <br className="d-sm-none"></br>
              }}
            />
          </h3>
        </div>
        <FourZeroFourCelebritiesSectionsLayout />
        <div className="container pb-4 pt-2 text-center">
          <NavLink to={ROUTING_PATHS.HOME_PATH}>
            <CallToActionButton
              className="FourZeroFourCelebrityProfile__see-more-button"
              fontSize="1.15rem"
            >
              <FormattedMessage defaultMessage="Ver más famosos" />
            </CallToActionButton>
          </NavLink>
        </div>
      </div>
    </PageContainer>
  );
};

export { FourZeroFourCelebrityProfile };
