import React from "react";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { CelebrityHeroSlideshow } from "../celebrity-hero-slideshow";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { connect } from "react-redux";
import { ResizableMainVideo } from "../resizable-main-video";
import { GoToSimilarCelebritiesButton } from "../go-to-similar-celebrities-button";

const CelebrityProfileLayoutC = ({ celebrity, hasPublicContracts }) => {
  return (
    <>
      <div
        className={`row container mx-auto py-lg-${
          celebrity.mainVideo ? "4" : "0"
        } p-0 justify-content-center`}
      >
        <div className="col-12 col-lg-4 p-0 m-0 px-sm-3">
          {hasPublicContracts ? (
            <CelebrityHeroSlideshow
              celebrityAvatar={celebrity.avatar}
              celebrityMainVideo={celebrity.mainVideo}
            />
          ) : celebrity.mainVideo ? (
            <ResizableMainVideo
              mainVideoUrl={celebrity.mainVideo}
              videoPosterUrl={celebrity.avatar}
            />
          ) : null}
        </div>
        <div
          className={`col-12 col-lg-${
            celebrity.mainVideo ? "8" : "10"
          } p-0 m-0 px-sm-3`}
        >
          <CelebrityDetails celebrity={celebrity} variant="2" />
        </div>
      </div>
      <HowToGetAVideoMessageLayout />
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <section
        className={`container text-center ${
          hasPublicContracts ? "py-4" : "pb-4"
        }`}
      >
        <GoToSimilarCelebritiesButton celebrityUsername={celebrity.username}>
          Ver famosos similares
        </GoToSimilarCelebritiesButton>
      </section>
      <HowToGetAVideoMessageLayout />
    </>
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
