import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { cursorOperations } from "../../../state/ducks/cursor-position";
import { connect } from "react-redux";
import { ContractPriceLayout } from "../celebrity-card-contract-price";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CountryFlag } from "../../containers/celebrity-country-flag";

const CelebrityCardLayout = ({ celebrity, currencyExchangeData }) => {
  const [avatarIsLoaded, setAvatarIsLoaded] = useState(false);
  const finishAvatarLoad = () => setAvatarIsLoaded(true);
  const [contractPrice, setContractPrice] = useState(0);
  useEffect(() => {
    let convertedPrice = celebrity.videoMessagePrice;
    if (currencyExchangeData.rate) {
      convertedPrice = celebrity.videoMessagePrice * currencyExchangeData.rate;
    }
    setContractPrice(convertedPrice);
  }, [currencyExchangeData]);

  const profileUrl = PATHS.CELEBRITY_PROFILE.replace(
    ":celebrity_username",
    celebrity.username
  );

  const registerClickOnCelebrity = () =>
    GTM.tagManagerDataLayer("CLICK_ON_CELEBRITY_CARD", celebrity);

  const registerHoverOnCelebrity = () =>
    GTM.tagManagerDataLayer("HOVER_ON_CELEBRITY_CARD", celebrity);

  return (
    <NavLink
      to={profileUrl}
      onClick={registerClickOnCelebrity}
      onMouseOver={registerHoverOnCelebrity}
      className='CelebrityCardLayout'
    >
      <div className='celebrity-card'>
        <div className='thumbnail'>
          <img
            alt='avatar'
            className={`celebrity__profile-photo ${
              !avatarIsLoaded ? "d-none" : ""
            }`}
            onLoad={finishAvatarLoad}
            src={celebrity.avatar}
          />
          <img
            src='/assets/img/avatar-blank.png'
            alt='avatar'
            className={`celebrity__profile-photo ${
              avatarIsLoaded ? "d-none" : ""
            }`}
          />
          {celebrity.availableForFlashDeliveries ? (
            <FlashDeliveryBadgeLayout className='celebrity__flash-delivery' />
          ) : null}
          {contractPrice > 0 ? (
            <div className='celebrity__price'>
              <ContractPriceLayout
                classes='celebrity__price__text'
                price={contractPrice}
                currency={currencyExchangeData.to}
                rounding={true}
              />
            </div>
          ) : null}
        </div>
        <div className='celebrity-details'>
          <div className='celebrity-info'>
            <CountryFlag
              className='celebrity__country'
              countryCode={celebrity.countryCode}
              width='20px'
            />
            <span className='celebrity__category'>{celebrity.title}</span>
            <CelebrityFavoriteButton celebrityId={celebrity.id} />
          </div>
          <h3 className='celebrity__full-name'>{celebrity.fullName}</h3>
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
