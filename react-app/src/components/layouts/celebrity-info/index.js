import React from "react";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { CelebrityContractPrice } from "../celebrity-contract-price";
import { CelebritiesResponseTime } from "../celebrities-response-time";
import Maybe from "../../common/helpers/maybe";

export const CelebrityInfo = ({
  fullName,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes,
  turnAround,
  availableForFlashDeliveries,
  variant,
  discountPercentage,
  status
}) => {
  switch (variant) {
    case "1":
    default:
      return (
        <>
          <h1 className="CelebrityInfo__full-name d-md-inline-block">
            {fullName}
          </h1>
          <CelebrityFavoriteButton
            className="d-none d-md-inline CelebrityInfo__fav-button-desktop"
            celebrityId={celebrityId}
            outlinedImageSource="assets/img/heart-regular-outlined.svg"
            width="2rem"
          />
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 CelebrityInfo__category">
              {categoryTitle}
            </span>
            <Maybe it={status !== 50}>
              <CelebrityFavoriteButton
                className="d-md-none ml-auto"
                celebrityId={celebrityId}
                outlinedImageSource="assets/img/heart-regular-outlined.svg"
                width="1.5rem"
              />
            </Maybe>
          </div>
          <Maybe it={status === 50}>
            <div className="d-flex align-items-center">
              <CelebrityContractPrice
                contractTypes={contractTypes}
                className="CelebrityInfo__contract-price"
                oldPriceClassName="CelebrityInfo__contract-price--invalid"
                discountClassName="CelebrityInfo__contract-price-discount"
              />
              <CelebrityFavoriteButton
                className="d-md-none ml-auto"
                celebrityId={celebrityId}
                outlinedImageSource="assets/img/heart-regular-outlined.svg"
                width="1.5rem"
              />
            </div>
          </Maybe>
          <div className="mt-md-2 mb-md-4">
            <CelebritiesResponseTime
              turnAroundTime={turnAround}
              availableForFlashDeliveries={availableForFlashDeliveries}
            />
          </div>
        </>
      );

    case "1.1":
      return (
        <>
          <CelebrityFavoriteButton
            className="mb-3"
            celebrityId={celebrityId}
            outlinedImageSource="assets/img/heart-regular-outlined.svg"
            width="1.25rem"
          />
          <h1 className="CelebrityInfo__full-name">{fullName}</h1>
          <div className="d-flex align-items-center mb-2 mb-md-3">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 CelebrityInfo__category">
              {categoryTitle}
            </span>
          </div>
        </>
      );

    case "2":
      return (
        <>
          <div className="text-right mb-2 d-md-none">
            <CelebrityFavoriteButton
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="1.25rem"
            />
          </div>
          <h1 className="CelebrityInfo__full-name d-md-inline-block">
            {fullName}
          </h1>
          <CelebrityFavoriteButton
            className="d-none d-md-inline CelebrityInfo__fav-button-desktop"
            celebrityId={celebrityId}
            outlinedImageSource="assets/img/heart-regular-outlined.svg"
            width="2rem"
          />
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 CelebrityInfo__category">
              {categoryTitle}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <Maybe it={status === 50}>
              <CelebrityContractPrice
                contractTypes={contractTypes}
                className="CelebrityInfo__contract-price"
                oldPriceClassName="CelebrityInfo__contract-price--invalid"
                discountClassName="CelebrityInfo__contract-price-discount"
              />
            </Maybe>
          </div>
          <div className="mt-md-2 mb-md-4">
            <CelebritiesResponseTime
              turnAroundTime={turnAround}
              availableForFlashDeliveries={availableForFlashDeliveries}
              className="CelebrityInfo__contract-price"
            />
          </div>
        </>
      );
  }
};
