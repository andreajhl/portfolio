import React from "react";
import { HOME_PATH } from "react-app/src/routing/Paths";
import { FormattedMessage } from "react-intl";
import { NavLink } from "../../common/routing";
import { FourZeroFourCelebritiesSectionsLayout } from "../404-celebrities-sections";
import { CallToActionButton } from "../call-to-action-button";
import { PageContainer } from "../page-container";
import styles from "./styles.module.scss";

type ErrorReportProps = {
  errorTitle: React.ReactNode | String;
  errorDescription?: React.ReactNode | String;
  errorPath?: React.ReactNode | String;
};

function ErrorReport({
  errorTitle,
  errorDescription,
  errorPath
}: ErrorReportProps) {
  return (
    <PageContainer applyFetchCelebrities={false} showFooter>
      <div className={styles.ErrorLayout}>
        <header className={styles.ErrorLayoutBanner}>
          <img
            src="/assets/img/index-header-backeground.png"
            alt="Famosa con teléfono"
            className="FourZeroFourCelebrityProfile__banner-img order-1 order-md-0"
          />
          <div className={styles.ErrorLayoutBannerContent}>
            <h3 className={styles.ErrorLayoutBannerTitle}>{errorTitle}</h3>

            {errorDescription ? (
              <h2 className={styles.ErrorLayoutBannerError}>
                {" "}
                {errorDescription}{" "}
              </h2>
            ) : null}

            {errorPath ? (
              <div className={styles.ErrorPathContainer}>
                <span> Ruta : {errorPath}</span>
              </div>
            ) : null}
            <NavLink
              to={HOME_PATH}
              className="FourZeroFourCelebrityProfile__banner-home-link"
            >
              <i className="fa fa-arrow-left FourZeroFourCelebrityProfile__banner-arrow-left" />{" "}
              <FormattedMessage defaultMessage="Volver al inicio" />
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
          <NavLink to={HOME_PATH}>
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
}

export default ErrorReport;
