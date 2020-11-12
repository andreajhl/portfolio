import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";
import { LoaderLayout } from "../loader";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.scss";
import { EndMessageLayout } from "../end-message";

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
      limit: resultsLimit
    });
  }, [offset]);

  const fetchMoreData = () => {
    setOffset((offset) => {
      const newOffset = offset + resultsLimit;
      return newOffset < totalResults ? newOffset : totalResults;
    });
  };

  return (
    <div className="CelebritiesSectionsLayout">
      {loading && offset === 0 ? (
        <CelebritiesShimmerCardsSectionLayout />
      ) : null}
      {celebritiesSections.length > 0 ? (
        <InfiniteScroll
          dataLength={celebritiesSections.length}
          next={fetchMoreData}
          hasMore={celebritiesSections.length < totalResults}
          loader={<LoaderLayout />}
          endMessage={<EndMessageLayout offsetTop={heroSectionHeight} />}
        >
          {celebritiesSections.map((celebritiesSection) => (
            <CelebritiesCardsSectionLayout
              key={celebritiesSection.id}
              title={celebritiesSection.title}
              type={celebritiesSection.celebritySectionType}
              celebrities={celebritiesSection.celebrities}
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
