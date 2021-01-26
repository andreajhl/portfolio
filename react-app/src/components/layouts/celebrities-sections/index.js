import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";
import { LoaderLayout } from "../loader";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.scss";
import { EndMessageLayout } from "../end-message";
import * as GTM from "../../../state/utils/gtm";

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading,
    celebritiesSections: data.results,
    totalResults: data.totalResults
  };
};

const mapDispatchToProps = { fetchCelebritySections };

const offsetInitialValue = 0;
const resultsLimit = 4;
const heroSectionHeight = 184;

const CelebritiesSectionsLayout = ({
  loading,
  celebritiesSections,
  totalResults,
  fetchCelebritySections
}) => {
  const [offset, setOffset] = useState(offsetInitialValue);

  useEffect(() => {
    fetchCelebritySections({
      offset,
      limit: resultsLimit,
      alpha2Code: window.userLocation.countryCode
    });
  }, [offset]);

  const fetchMoreData = () => {
    setOffset((offset) => {
      const nextOffset = offset + resultsLimit;
      const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
      GTM.tagManagerDataLayer("FETCH_MORE_CELEBRITY_SECTIONS", {
        widget: "CelebritiesSectionsLayout",
        path: window.location.pathname,
        newOffset,
        totalResults,
        hasReachedEnd: newOffset + resultsLimit >= totalResults
      });
      return newOffset;
    });
  };

  const registerGoBackButtonClick = () =>
    GTM.tagManagerDataLayer("CLICK_CELEBRITY_SECTIONS_GO_UP_BUTTON", {
      widget: "CelebritiesSectionsLayout",
      path: window.location.pathname,
      celebritiesSectionsLength: celebritiesSections.length
    });

  return (
    <div className="CelebritiesSectionsLayout">
      {loading && offset === 0 ? (
        <CelebritiesShimmerCardsSectionLayout />
      ) : celebritiesSections.length > 0 ? (
        <InfiniteScroll
          dataLength={celebritiesSections.length}
          next={fetchMoreData}
          hasMore={celebritiesSections.length < totalResults}
          loader={<LoaderLayout />}
          endMessage={
            <EndMessageLayout
              offsetTop={heroSectionHeight}
              onClick={registerGoBackButtonClick}
            />
          }
        >
          {celebritiesSections.map((celebritiesSection, index) => (
            <CelebritiesCardsSectionLayout
              key={celebritiesSection.id}
              celebritiesSection={celebritiesSection}
              hasMoreResults={
                celebritiesSection.celebritySectionType === "CELEBRITY_CARD" &&
                celebritiesSection.celebrities.length >= 10
              }
            />
          ))}
        </InfiniteScroll>
      ) : null}
    </div>
  );
};

CelebritiesSectionsLayout.defaultProps = {};

// Export Class
const _CelebritiesSectionsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesSectionsLayout);

export { _CelebritiesSectionsLayout as CelebritiesSectionsLayout };
