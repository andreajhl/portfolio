import React from "react";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { SubscriptionToAvailabilityNotification } from "../subscription-to-availability-notification";
const HowToGetAVideoMessageLayout = dynamic(() =>
  import("../how-to-get-a-video-message").then(
    (mod) => mod.HowToGetAVideoMessageLayout
  )
);
const SimilarCelebritiesCardsSectionLayout = dynamic(() =>
  import("../similar-celebrities-cards-section").then(
    (mod) => mod.SimilarCelebritiesCardsSectionLayout
  )
);
const SimilarCelebrityContractsSectionLayout = dynamic(() =>
  import("../similar-celebrity-contracts-section").then(
    (mod) => mod.SimilarCelebrityContractsSectionLayout
  )
);
const CelebrityPublicContractsSectionLayout = dynamic(() =>
  import("../celebrity-public-contracts-section").then(
    (mod) => mod.CelebrityPublicContractsSectionLayout
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

const CelebrityProfileLayoutB = ({ celebrity, hasPublicContracts }) => {
  return (
    <>
      <div
        className={`row container mx-auto py-lg-${
          celebrity.mainVideo ? "4" : "0"
        } p-0 justify-content-center`}
      >
        {celebrity.mainVideo ? (
          <div className="col-12 col-lg-4 p-0 m-0 px-sm-3">
            <ResizableMainVideo
              mainVideoUrl={celebrity.mainVideo}
              videoPosterUrl={celebrity.avatar}
            />
          </div>
        ) : null}
        <div
          className={`col-12 col-lg-${
            celebrity.mainVideo ? "8" : "10"
          } p-0 m-0 px-sm-3`}
        >
          <CelebrityDetails celebrity={celebrity} variant="1" />
        </div>
      </div>
      <HowToGetAVideoMessageLayout />
      {hasPublicContracts ? (
        <>
          <CelebrityPublicContractsSectionLayout
            contractTypes={celebrity.contractTypes}
            celebrityId={celebrity.id}
            username={celebrity.username}
            celebrityFullName={celebrity.fullName}
            celebrityAvatar={celebrity.avatar}
          />
        </>
      ) : null}
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <SimilarCelebritiesCardsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <SimilarCelebrityContractsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <div className="container pb-4 pt-2 text-center">
        {celebrity.status === 50 ? (
          <HireThisCelebrityButton
            showCelebrityName={true}
            className="get-a-video-button px-md-5 py-3 px-4"
            text="Quiero un video de"
            fontSize="1.25em"
            celebrityFullName={celebrity.fullName}
            celebrityUsername={celebrity.username}
          />
        ) : null}{" "}
      </div>
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
