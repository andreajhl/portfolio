import React from "react";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityPublicContractsSectionLayout } from "../celebrity-public-contracts-section";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { SimilarCelebritiesCardsSectionLayout } from "../similar-celebrities-cards-section";
import { CelebrityHeroSlideshow } from "../celebrity-hero-slideshow";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { CelebrityProfileLayoutB } from "../celebrity-profile-b";
import { connect } from "react-redux";
import { ResizableMainVideo } from "../resizable-main-video";
import { SimilarCelebrityContractsSectionLayout } from "../similar-celebrity-contracts-section";

const CelebrityProfileLayoutA = ({ celebrity, hasPublicContracts }) => {
  return celebrity.mainVideo || hasPublicContracts ? (
    <>
      <div className="row container mx-auto py-lg-4 p-0">
        <div className="col-12 col-lg-4 order-lg-1 p-0 m-0 px-sm-3">
          {hasPublicContracts ? (
            <CelebrityHeroSlideshow
              celebrityAvatar={celebrity.avatar}
              celebrityMainVideo={celebrity.mainVideo}
            />
          ) : (
            <ResizableMainVideo
              mainVideoUrl={celebrity.mainVideo}
              videoPosterUrl={celebrity.avatar}
            />
          )}
        </div>
        <div className="col-12 col-lg-8 p-0 m-0 px-sm-3">
          <CelebrityDetails celebrity={celebrity} variant="2" />
        </div>
      </div>

      {/* <CelebrityPublicContractsSectionLayout
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
      ) : null} */}
      {/* <SimilarCelebritiesCardsSectionLayout
        celebrityUsername={celebrity.username}
      /> */}
      <SimilarCelebrityContractsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <HowToGetAVideoMessageLayout />
    </>
  ) : (
    <CelebrityProfileLayoutB celebrity={celebrity} />
  );
};

CelebrityProfileLayoutA.defaultProps = {
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

const _CelebrityProfileLayoutA = connect(mapStateToProps)(
  CelebrityProfileLayoutA
);

export { _CelebrityProfileLayoutA as CelebrityProfileLayoutA };
