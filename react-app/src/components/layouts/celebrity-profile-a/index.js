import React from "react";
import { connect } from "react-redux";
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
const CelebrityPublicContractsSectionLayout = dynamic(() =>
  import("../celebrity-public-contracts-section").then(
    (mod) => mod.CelebrityPublicContractsSectionLayout
  )
);
const SimilarCelebritiesCardsSectionLayout = dynamic(() =>
  import("../similar-celebrities-cards-section").then(
    (mod) => mod.SimilarCelebritiesCardsSectionLayout
  )
);
const HireThisCelebrityButton = dynamic(() =>
  import("../hire-this-celebrity-button").then(
    (mod) => mod.HireThisCelebrityButton
  )
);
const CelebrityProfileLayoutB = dynamic(() =>
  import("../celebrity-profile-b").then((mod) => mod.CelebrityProfileLayoutB)
);
const SimilarCelebrityContractsSectionLayout = dynamic(() =>
  import("../similar-celebrity-contracts-section").then(
    (mod) => mod.SimilarCelebrityContractsSectionLayout
  )
);

const CelebrityProfileLayoutA = ({ celebrity, hasPublicContracts }) => {
  return celebrity.mainVideo || hasPublicContracts ? (
    <>
      <div className="row container mx-auto py-lg-4 p-0">
        <div className="col-12 col-lg-4 p-0 m-0 px-sm-3">
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
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <HowToGetAVideoMessageLayout />

      <div className="py-4">
        <SimilarCelebrityContractsSectionLayout
          celebrityUsername={celebrity.username}
        />
      </div>
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
