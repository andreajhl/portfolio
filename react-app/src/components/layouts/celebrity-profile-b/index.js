import React from "react";
import { NavLink } from "react-router-dom";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityPublicContractsSectionLayout } from "../celebrity-public-contracts-section";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { SimilarCelebritiesCardsSectionLayout } from "../similar-celebrities-cards-section";
import { SimilarCelebrityContractsSectionLayout } from "../similar-celebrity-contracts-section";
import { ResizableMainVideo } from "../resizable-main-video";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { connect } from "react-redux";

const CelebrityProfileLayoutB = ({ celebrity, hasPublicContracts }) => {
  return (
    <>
      <div
        className={`row container mx-auto py-lg-${
          celebrity.mainVideo ? "4" : "0"
        } p-0 justify-content-center`}
      >
        {celebrity.mainVideo ? (
          <div className="col-12 col-lg-4 order-lg-1 p-0 m-0 px-sm-3">
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
          />
          {/* <section className="container text-center pt-2 pb-4">
            <NavLink to="#">
              <button
                type="button"
                className="btn btn-primary similar-celebrities-button"
                style={{
                  background: "#FFE1F0",
                  borderRadius: "5px",
                  border: "none",
                  padding: "0.75em 1.5em",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#FB177D"
                }}
              >
                Ver famosos similares
              </button>
            </NavLink>
          </section> */}
        </>
      ) : null}
      <SimilarCelebritiesCardsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <SimilarCelebrityContractsSectionLayout
        celebrityUsername={celebrity.username}
      />
      <div className="container pb-4 pt-2 text-center">
        <HireThisCelebrityButton
          className="get-a-video-button px-md-5 py-3 px-4"
          text="Quiero un video de"
          fontSize="1.25em"
          celebrityFullName={celebrity.fullName}
          celebrityUsername={celebrity.username}
        />
      </div>
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
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
