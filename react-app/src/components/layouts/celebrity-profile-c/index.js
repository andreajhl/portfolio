import React from "react";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { CelebrityHeroSlideshow } from "../celebrity-hero-slideshow";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { CelebrityProfileLayoutB } from "../celebrity-profile-b";
import { connect } from "react-redux";
import { ResizableMainVideo } from "../resizable-main-video";
import { GoToSimilarCelebritiesButton } from "../go-to-similar-celebrities-button";

const CelebrityProfileLayoutC = ({ celebrity, hasPublicContracts }) => {
  return celebrity.mainVideo || hasPublicContracts ? (
    <>
      <div className="row container mx-auto py-lg-4 p-0">
        <div className="col-12 col-lg-4 order-lg-1 p-0 m-0 px-sm-3">
          {hasPublicContracts ? (
            <CelebrityHeroSlideshow celebrityMainVideo={celebrity.mainVideo} />
          ) : (
            <ResizableMainVideo mainVideoUrl={celebrity.mainVideo} />
          )}
        </div>
        <div className="col-12 col-lg-8 p-0 m-0 px-sm-3">
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
        </div>
      </div>
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <section className="container text-center pt-4 pb-3">
        <GoToSimilarCelebritiesButton celebrityUsername={celebrity.username}>
          Ver famosos similares
        </GoToSimilarCelebritiesButton>
      </section>
      <HowToGetAVideoMessageLayout />
    </>
  ) : (
    <CelebrityProfileLayoutB celebrity={celebrity} />
  );
};

CelebrityProfileLayoutC.defaultProps = {
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

const _CelebrityProfileLayoutC = connect(mapStateToProps)(
  CelebrityProfileLayoutC
);

export { _CelebrityProfileLayoutC as CelebrityProfileLayoutC };
