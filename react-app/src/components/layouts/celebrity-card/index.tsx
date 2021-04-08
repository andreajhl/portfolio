import React, { useState, useEffect } from "react";
import { NavLink } from "../../common/routing";

import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { cursorOperations } from "../../../state/ducks/cursor-position";
import { connect } from "react-redux";
import { ContractPriceLayout } from "../celebrity-card-contract-price";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { celebrityType } from "../../../types/celebrityType";
import Maybe from "../../common/helpers/maybe";
import LazyLoadingImage from "../../common/lazy-loading-image";

export interface CelebrityCardLayoutI {
  celebrity: celebrityType;
  currencyExchangeData: {
    to: string;
    rate?: number;
  };
  celebrityCardLayout: {
    width?: number | string;
    height?: number | string;
  };
}

const CelebrityCardLayout = ({
  celebrity,
  currencyExchangeData,
  celebrityCardLayout
}: CelebrityCardLayoutI) => {
  const [contractPrice, setContractPrice] = useState(
    celebrity.videoMessagePrice
  );

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
      className="CelebrityCardLayout"
    >
      <div className="celebrity-card">
        <div className="thumbnail">
          <LazyLoadingImage
            alt="avatar"
            className="celebrity__profile-photo"
            src={celebrity.avatar}
            height={celebrityCardLayout?.height || 156}
            objectFit="cover"
            width={celebrityCardLayout?.width || 156}
            placeholderSrc="/assets/img/avatar-blank.png"
          />
          {celebrity.availableForFlashDeliveries ? (
            <FlashDeliveryBadgeLayout className="celebrity__flash-delivery" />
          ) : null}
          <Maybe it={contractPrice > 0 && celebrity.status === 50}>
            <div className="celebrity__price">
              <ContractPriceLayout
                classes="celebrity__price__text"
                price={contractPrice}
                currency={currencyExchangeData.to}
                rounding={true}
              />
            </div>
          </Maybe>
        </div>
        <div className="celebrity-details">
          <div className="celebrity-info">
            <CountryFlag
              className="celebrity__country"
              countryCode={celebrity.countryCode}
              width="20px"
            />
            <span className="celebrity__category">{celebrity.title}</span>
            <CelebrityFavoriteButton celebrityId={celebrity.id} />
          </div>
          <h3 className="celebrity__full-name">{celebrity.fullName}</h3>
        </div>
      </div>
    </NavLink>
  );
};
const mapStateToProps = (state) => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

const mapDispatchToProps = {
  updateCursorPosition: cursorOperations.saveCursorPosition
};

const _CelebrityCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityCardLayout);

export default CelebrityCardLayout;

export { _CelebrityCardLayout as CelebrityCardLayout };
