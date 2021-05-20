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
import {
  CATEGORIES_TITLES_WITH_TRANSLATION_AVAILABLE,
  labelMessagesForCategoriesFilter,
} from "react-app/src/constants/messages";
import { useIntl } from "react-intl";
import LazyLoadingImage from "../../common/lazy-loading-image";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";

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
  celebrityCardLayout,
}: CelebrityCardLayoutI) => {
  const [contractPrice, setContractPrice] = useState(
    celebrity.videoMessagePrice
  );
  const intl = useIntl();

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

  const { discountPercentage } = celebrity;
  const getCategory = () => {
    return CATEGORIES_TITLES_WITH_TRANSLATION_AVAILABLE.includes(
      celebrity.title
    )
      ? intl.formatMessage(labelMessagesForCategoriesFilter[celebrity.title])
      : celebrity.title;
  };

  const getEncodeURLWithParams = (URLImage) => {
    return `${URLImage}?${celebrity.title}-${celebrity.countryCode}`;
  };

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
            alt={`${getCategory()} - ${celebrity.fullName}`}
            className="celebrity__profile-photo"
            src={getEncodeURLWithParams(celebrity.avatar)}
            height={celebrityCardLayout?.height || 156}
            objectFit="cover"
            width={celebrityCardLayout?.width || 156}
            placeholderSrc="/assets/img/avatar-blank.png"
          />
          <Maybe it={discountPercentage > 0}>
            <span className="celebrity__discount">
              -{discountPercentage * 100}%
            </span>
          </Maybe>
          <Maybe it={celebrity.availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout className="celebrity__flash-delivery" />
          </Maybe>
          <Maybe it={celebrity.availableForSubscriptions}>
            <img
              className="celebrity__subscription-star"
              src="/assets/img/subscription-star-pink.svg"
              alt="Icono de Club de fans"
            />
          </Maybe>
          <Maybe it={contractPrice > 0 && celebrity.status === 50}>
            <div
              className={`celebrity__price ${
                discountPercentage ? "celebrity__price--discounted" : ""
              }`}
            >
              <ContractPriceLayout
                classes="celebrity__price__text"
                price={
                  discountPercentage
                    ? contractPrice - contractPrice * discountPercentage
                    : contractPrice
                }
                currency={currencyExchangeData.to}
                rounding={
                  currencyExchangeData.to !== "USD" || !discountPercentage
                }
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
            <span className="celebrity__category">{getCategory()}</span>
            <CelebrityFavoriteButton celebrityId={celebrity.id} />
          </div>
          <h3 className="celebrity__full-name">{celebrity.fullName}</h3>
        </div>
      </div>
    </NavLink>
  );
};
const mapStateToProps = (state) => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

const mapDispatchToProps = {
  updateCursorPosition: cursorOperations.saveCursorPosition,
};

const _CelebrityCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityCardLayout);

export default CelebrityCardLayout;

export { _CelebrityCardLayout as CelebrityCardLayout };
