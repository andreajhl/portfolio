import React from "react";
import { NavLink } from "react-router-dom";
import { CelebrityDetails } from "../celebrity-details";
import { CelebrityPublicContractsSectionLayout } from "../celebrity-public-contracts-section";
import { CelebrityReviewsSectionLayout } from "../celebrity-reviews-section";
import { SimilarCelebritiesCardsSectionLayout } from "../similar-celebrities-cards-section";
import { SimilarCelebrityContractsSectionLayout } from "../similar-celebrity-contracts-section";
import { CelebrityMainVideoSection } from "../main-video-section";
import HowToGetAVideoMessageLayout from "../how-to-get-a-video-message";
import { connect } from "react-redux";

const CelebrityProfileLayoutA = ({ celebrity, hasPublicContracts }) => {
  console.log({ hasPublicContracts });
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
      />
      {hasPublicContracts ? (
        <>
          <CelebrityPublicContractsSectionLayout
            contractTypes={celebrity.contractTypes}
            celebrityId={celebrity.id}
            username={celebrity.username}
          />
          <section className="container text-center pt-2 pb-4">
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
          </section>
        </>
      ) : (
        <>
          <SimilarCelebritiesCardsSectionLayout
            celebrityUsername={celebrity.username}
          />
          <SimilarCelebrityContractsSectionLayout
            celebrityUsername={celebrity.username}
          />
        </>
      )}
      <CelebrityReviewsSectionLayout celebrityId={celebrity.id} />
      <HowToGetAVideoMessageLayout />
    </>
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
