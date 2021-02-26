import React, { useEffect, useState } from "react";
import { fetchSimilarResults } from "../../../state/ducks/celebrities/actions";
import * as GTM from "../../../state/utils/gtm";
import { CelebritiesInfinityScrollLayout } from "../celebrities-infinity-scroll";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import { connect } from "react-redux";
import { CelebritiesResultsShimmerCardsLayout } from "../celebrities-results-shimmer-cards";

function noop() {}

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchCelebritiesSimilarResultsReducer.loading,
    requestCancel:
      celebrities.fetchCelebritiesSimilarResultsReducer.requestCancel || noop,
    celebrities: celebrities.fetchCelebritiesSimilarResultsReducer.data.results,
    totalResults:
      celebrities.fetchCelebritiesSimilarResultsReducer.data.totalResults
  };
};

const mapDispatchToProps = {
  fetchSimilarResults
};

const CelebritiesSimilarResultsLayout = ({
  isLoading,
  requestCancel,
  celebrities,
  totalResults,
  fetchSimilarResults,
  similarResultsParams
}) => {
  const [offset, setOffset] = useState(updateQueryParamsInitialState.offset);

  const analyticsData = {
    widget: "CelebritiesSimilarResultsLayout",
    path: window.location.pathname,
    totalResults,

    similarResultsParams
  };

  const registerCelebritiesResultsGoUpButtonClick = () =>
    GTM.tagManagerDataLayer(
      "CLICK_CELEBRITIES_SIMILAR_RESULTS_GO_UP_BUTTON",
      analyticsData
    );

  useEffect(() => {
    fetchSimilarResults(similarResultsParams);
    setOffset(updateQueryParamsInitialState.offset);
  }, [similarResultsParams]);

  const fetchMoreData = () => {
    const { limit } = updateQueryParamsInitialState;
    const nextOffset = offset ? offset + limit : limit;
    const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
    setOffset(newOffset);
    fetchSimilarResults({
      ...similarResultsParams,
      offset: newOffset
    });
    GTM.tagManagerDataLayer("FETCH_MORE_CELEBRITIES_SIMILAR_RESULTS", {
      ...analyticsData,
      offset: newOffset
    });
  };

  useEffect(() => requestCancel, [requestCancel]);

  return isLoading && offset <= 0 ? (
    <CelebritiesResultsShimmerCardsLayout />
  ) : (
    <CelebritiesInfinityScrollLayout
      sectionTitleText="Quizás te pueda interesar"
      onEndMessageButtonClick={registerCelebritiesResultsGoUpButtonClick}
      noResultsText="No se encontraron resultados esta búsqueda"
      celebrities={celebrities}
      totalResults={totalResults}
      fetchMoreData={fetchMoreData}
      totalResultsToShowGoBackButton={10}
    />
  );
};

CelebritiesSimilarResultsLayout.defaultProps = {
  isLoading: false,
  requestCancel: () => {},
  celebrities: [],
  totalResults: 0,
  fetchSimilarResults: () => {}
};

const _CelebritiesSimilarResultsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesSimilarResultsLayout);

export { _CelebritiesSimilarResultsLayout as CelebritiesSimilarResultsLayout };
