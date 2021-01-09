import React from "react";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { CelebrityContractPrice } from "../celebrity-contract-price";
import { CelebritiesResponseTime } from "../celebrities-response-time";
import "./styles.scss";

export const CelebrityInfo = ({
  fullName,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes,
  turnAround,
  variant
}) => {
  switch (variant) {
    case "1":
    default:
      return (
        <>
          <h4 className="CelebrityInfo__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityInfo__category">
              {categoryTitle}
            </span>
            <CelebrityFavoriteButton
              className="d-none d-md-block CelebrityInfo__fav-button-desktop"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="2.5rem"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <CelebrityContractPrice
              contractTypes={contractTypes}
              className="CelebrityInfo__contract-price"
            />
            <CelebrityFavoriteButton
              className="d-md-none"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="1.5rem"
            />
          </div>
          <div className="mt-md-2 mb-md-4">
            <CelebritiesResponseTime turnAroundTime={turnAround} />
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
          <h4 className="CelebrityInfo__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2 mb-md-3">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityInfo__category">
              {categoryTitle}
            </span>
          </div>
        </>
      );

    case "2":
      return (
        <>
          <div className="text-right mb-2">
            <CelebrityFavoriteButton
              className="d-md-none"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="1.25rem"
            />
          </div>
          <h4 className="CelebrityInfo__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityInfo__category">
              {categoryTitle}
            </span>
            <CelebrityFavoriteButton
              className="d-none d-md-inline ml-auto"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="2.5rem"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <CelebrityContractPrice
              contractTypes={contractTypes}
              className="CelebrityInfo__contract-price"
            />
          </div>
          <div className="mt-md-2 mb-md-4">
            <CelebritiesResponseTime
              turnAroundTime={turnAround}
              className="CelebrityInfo__contract-price"
            />
          </div>
        </>
      );
  }
};
