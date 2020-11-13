import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { cursorOperations } from "../../../state/ducks/cursor-position";
import { connect } from "react-redux";
import { ContractPriceLayout } from "../celebrity-card-contract-price";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";

const CelebrityCardLayout = ({
  celebrity,
  countries,
  currencyExchangeData
}) => {
  const [avatarIsLoaded, setAvatarIsLoaded] = useState(false);
  const finishAvatarLoad = () => setAvatarIsLoaded(true);

  const celebrityCountry = countries.find(
    (country) => country.alpha3Code === celebrity.countryCode
  );

  const contractPrice =
    currencyExchangeData.rate > 1
      ? celebrity.videoMessagePrice * currencyExchangeData.rate +
        celebrity.videoMessagePrice
      : celebrity.videoMessagePrice;

  const profileUrl = PATHS.CELEBRITY_PROFILE.replace(
    ":celebrity_username",
    celebrity.username
  );

  const registerClickOnCelebrity = () =>
    GTM.tagManagerDataLayer("CLICK_ON_CELEBRITY_CARD", celebrity);

  return (
    <NavLink
      to={profileUrl}
      onClick={registerClickOnCelebrity}
      className="CelebrityCardLayout"
    >
      <div className="celebrity-card">
        <div className="thumbnail">
          <img
            alt="avatar"
            className={`celebrity__profile-photo ${
              !avatarIsLoaded ? "d-none" : ""
            }`}
            onLoad={finishAvatarLoad}
            src={celebrity.avatar}
          />
          <img
            src="/assets/img/avatar-blank.png"
            alt="avatar"
            className={`celebrity__profile-photo ${
              avatarIsLoaded ? "d-none" : ""
            }`}
          />
          {contractPrice > 0 ? (
            <div className="celebrity__price">
              <ContractPriceLayout
                classes="celebrity__price__text"
                price={contractPrice}
                currency={currencyExchangeData.to}
                rounding={true}
              />
            </div>
          ) : null}
        </div>
        <div className="celebrity-details">
          <div className="celebrity-info">
            {celebrityCountry ? (
              <img
                src={
                  celebrityCountry.alpha3Code === "USA"
                    ? "/assets/img/usa.svg"
                    : celebrityCountry.flag
                }
                alt="Country"
                className="celebrity__country"
                width="24px"
              />
            ) : (
              <span
                className="text-white spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span className="celebrity__category">{celebrity.title}</span>
            <CelebrityFavoriteButton celebrityId={celebrity.id} />
          </div>
          <h3 className="celebrity__full-name">{celebrity.fullName}</h3>
        </div>
      </div>
    </NavLink>
  );
};

// default props
CelebrityCardLayout.defaultProps = {
  celebrity: {}
};

// Set propTypes
CelebrityCardLayout.propTypes = {};

// Set defaultProps
CelebrityCardLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
  countries: state.restCountries.fetchCountriesReducer.data,
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  updateCursorPosition: cursorOperations.saveCursorPosition
};

// Export Class
const _CelebrityCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityCardLayout);
export { _CelebrityCardLayout as CelebrityCardLayout };
