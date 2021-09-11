import React from "react";
import { CelebritiesResponseTime } from "../celebrities-response-time";
import { useIntl } from "react-intl";
import { CelebrityInfoReviews } from "desktop-app/components/celebrity-profile/celebrity-info-reviews";
import getTranslatedCategoryTitle from "lib/utils/getTranslatedCategoryTitle";
import { ShareCelebrityDropdown } from "desktop-app/components/celebrity-profile/share-celebrity-dropdown";
import { CelebrityFavoriteButton } from "desktop-app/components/celebrity-profile/celebrity-favorite-button";
import { CountryFlag } from "desktop-app/components/common/country-flag";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchCategoryPath } from "constants/paths";

function CelebrityInfo({ celebrity, variant }) {
  const { formatMessage } = useIntl();
  const categoryTitle = getTranslatedCategoryTitle(
    celebrity.categoryTitle,
    formatMessage
  );

  const {
    fullName,
    countryId,
    alpha2Code,
    id: celebrityId,
    turnAround,
    availableForFlashDeliveries,
    starsAverage,
    categoryId,
  } = celebrity;

  const searchCategoryLink = getSearchCategoryPath(categoryId);

  switch (variant) {
    case "1":
    default:
      return (
        <>
          <h1 className="CelebrityInfo__full-name">{fullName}</h1>
          <div className="d-flex align-items-center mb-2 flex-wrap">
            <CountryFlag
              countryId={countryId}
              alpha2Code={alpha2Code}
              width={24}
            />
            <Link
              href={searchCategoryLink}
              className="ml-3 mr-auto CelebrityInfo__category"
            >
              {categoryTitle}
            </Link>
            <div>
              <ShareCelebrityDropdown
                celebrity={celebrity}
                buttonClassName="CelebrityInfo__ShareCelebrityDropdown"
              />
              <CelebrityFavoriteButton
                celebrityId={celebrityId}
                className="CelebrityInfo__CelebrityFavoriteButton"
              />
            </div>
          </div>
          <div className="mt-md-2 mb-md-4 CelebrityInfo__response-time-2">
            <CelebrityInfoReviews celebrityStarsAverage={starsAverage} />
            <CelebritiesResponseTime
              turnAroundTime={turnAround}
              availableForFlashDeliveries={availableForFlashDeliveries}
            />
          </div>
        </>
      );

    case "2":
      return (
        <>
          <h1 className="CelebrityInfo__full-name">{fullName}</h1>
          <div className="d-flex align-items-center mb-2 flex-wrap">
            <CountryFlag
              countryId={countryId}
              alpha2Code={alpha2Code}
              width={24}
            />
            <Link
              href={searchCategoryLink}
              className="ml-3 mr-auto CelebrityInfo__category"
            >
              {categoryTitle}
            </Link>
            <CelebrityInfoReviews celebrityStarsAverage={starsAverage} />
          </div>
          <div className="mt-md-2 mb-md-4 CelebrityInfo__response-time">
            <CelebritiesResponseTime
              turnAroundTime={turnAround}
              availableForFlashDeliveries={availableForFlashDeliveries}
            />
          </div>
          <div className="text-right mt-1">
            <ShareCelebrityDropdown
              celebrity={celebrity}
              buttonClassName="CelebrityInfo__ShareCelebrityDropdown"
            />
            <CelebrityFavoriteButton
              celebrityId={celebrityId}
              className="CelebrityInfo__CelebrityFavoriteButton"
            />
          </div>
        </>
      );
  }
}

export { CelebrityInfo };
