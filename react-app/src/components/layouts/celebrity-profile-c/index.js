import React from "react";
import { connect } from "react-redux";
import { GoToSimilarCelebritiesButton } from "../go-to-similar-celebrities-button";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import dynamic from "next/dynamic";

const CelebrityHeroSlideshow = dynamic(() =>
  import("../celebrity-hero-slideshow").then(
    (mod) => mod.CelebrityHeroSlideshow
  )
);
const HowToGetAVideoMessageLayout = dynamic(() =>
  import("../how-to-get-a-video-message").then(
    (mod) => mod.HowToGetAVideoMessageLayout
  )
);
const ResizableMainVideo = dynamic(() =>
  import("../resizable-main-video").then((mod) => mod.ResizableMainVideo)
);
const CelebrityDetails = dynamic(() =>
  import("../celebrity-details").then((mod) => mod.CelebrityDetails)
);
const CelebrityReviewsSectionLayout = dynamic(() =>
  import("../celebrity-reviews-section").then(
    (mod) => mod.CelebrityReviewsSectionLayout
  )
);

const CelebrityProfileLayoutC = ({ celebrity, hasPublicContracts }) => {
  const hasVideos = celebrity.mainVideo || hasPublicContracts;
  return (
    <>
      <div
        className={`row container mx-auto py-lg-${
          hasVideos ? "4" : "0"
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
          className={`col-12 col-lg-${hasVideos ? "8" : "10"} p-0 m-0 px-sm-3`}
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
        <div className="row justify-content-center mb-2">
          <HireThisCelebrityButton
            showCelebrityName={true}
            celebrityFullName={celebrity.fullName}
            celebrityUsername={celebrity.username}
            text="Quiero un video de"
            fontSize="1.25em"
            width="320px"
          />
        </div>
        <GoToSimilarCelebritiesButton
          celebrityUsername={celebrity.username}
          fontSize="1.25em"
          width="320px"
        >
          Ver famosos similares
        </GoToSimilarCelebritiesButton>
      </section>
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
