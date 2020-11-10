import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.scss";

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading,
    celebritiesSections: data.results,
    totalResults: data.totalResults
  };
};

const mapDispatchToProps = { fetchCelebritySections };

const Loader = (
  <div className="loading-section mx-auto text-center">
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const offsetInitialValue = 0;
const resultsLimit = 10;

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

  const goBackUp = () => {
    document.documentElement.scroll({ top: 150, behavior: "smooth" });
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
          loader={Loader}
          endMessage={
            <p className="text-center text-muted">
              Wao! al parecer no hay más resultados. <br />
              <button
                type="button"
                onClick={goBackUp}
                className="btn btn-primary mt-2"
              >
                Volver arriba
              </button>
            </p>
          }
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
