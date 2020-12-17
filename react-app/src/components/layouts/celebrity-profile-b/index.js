import React from "react";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityPublicContractsSectionLayout } from "../celebrity-public-contracts-section";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { SimilarCelebritiesCardsSectionLayout } from "../similar-celebrities-cards-section";
import { CelebrityMainVideoSection } from "../main-video-section";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { connect } from "react-redux";

const CelebrityProfileLayoutB = ({ celebrity, hasPublicContracts }) => {
  return (
    <>
      {celebrity.mainVideo ? (
        <CelebrityMainVideoSection mainVideoUrl={celebrity.mainVideo} />
      ) : null}
      <CelebrityDetails
        fullName={celebrity.fullName}
        username={celebrity.username}
        avatar={celebrity.avatar}
        countryCode={celebrity.countryCode}
        celebrityId={celebrity.id}
        categoryTitle={celebrity.categoryTitle}
        contractTypes={celebrity.contractTypes}
        variant="2"
      />
      <CelebrityPublicContractsSectionLayout
        contractTypes={celebrity.contractTypes}
        celebrityId={celebrity.id}
        username={celebrity.username}
      />
      {hasPublicContracts ? (
        <div className="container pb-4 pt-2 text-center">
          <HireThisCelebrityButton
            className="get-a-video-button px-md-5 py-3 px-4"
            text="Quiero un video como este"
            fontSize="1.25em"
          />
        </div>
      ) : null}
      <SimilarCelebritiesCardsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <HowToGetAVideoMessageLayout />
    </>
  );
};

CelebrityProfileLayoutB.defaultProps = {
  celebrity: {},
  hasPublicContracts: true
};

const mapStateToProps = ({ celebrities: { fetchPublicContractsReducer } }) => {
  return {
    hasPublicContracts:
      !fetchPublicContractsReducer.completed ||
      fetchPublicContractsReducer.data.results.length > 0
  };
};

const _CelebrityProfileLayoutB = connect(mapStateToProps)(
  CelebrityProfileLayoutB
);

export { _CelebrityProfileLayoutB as CelebrityProfileLayoutB };
