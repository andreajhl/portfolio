import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { CelebritiesResultsShimmerCardsLayout } from "../../layouts/celebrities-results-shimmer-cards";
import { CelebritiesResultsLayout } from "../../layouts/celebrities-results";
import { queryStringToJSON } from "../../../state/utils/apiService";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import * as GTM from "../../../state/utils/gtm";
import { CelebritiesAdditionalResultsLayout } from "../../layouts/celebrities-additional-results";
import pickPropertiesFromAObject from "../../../utils/pickPropertiesFromAObject";
import { withRouter } from "react-app/src/components/common/routing";
import useIsInBrowser from "react-app/src/utils/useIsInBrowser";

function noop() {}

const mapStateToProps = ({ celebrities }) => {
  console.log(celebrities.fetchCelebritiesReducer.loading);
  return {
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    isCompleted: celebrities.fetchCelebritiesReducer.completed,
    requestCancel: celebrities.fetchCelebritiesReducer.requestCancel || noop,
    celebrities: celebrities.fetchCelebritiesReducer.data.results,
    totalResults: celebrities.fetchCelebritiesReducer.data.totalResults,
    previousPath: celebrities.previousPathReducer.pathname
  };
};

const mapDispatchToProps = {
  fetchCelebrities: celebrityOperations.list
};

const listParamsInitialKeys = ["offset", "limit"];

const hasSearched = (listParams) => {
  const listParamsEntries = Object.entries(listParams);
  return listParamsEntries.some(
    ([key, value]) => !listParamsInitialKeys.includes(key) && Boolean(value)
  );
};

const allowedParams = [
  "search",
  "limit",
  "offset",
  "country_id",
  "category_id",
  "orderBy"
];

const CelebritiesResultsPage = ({
  fetchCelebrities,
  isLoading,
  celebrities,
  totalResults,
  previousPath,
  requestCancel,
  isCompleted,
  location,
  history
}) => {
  const [offset, setOffset] = useState(updateQueryParamsInitialState.offset);
  const listParams = useMemo(
    () =>
      pickPropertiesFromAObject(
        queryStringToJSON(location.search),
        allowedParams
      ),
    [location.search]
  );

  useEffect(() => requestCancel, [requestCancel]);

  useEffect(() => {
    if (Object.keys(listParams).length === 0 || !hasSearched(listParams)) {
      history.push(previousPath);
    } else {
      fetchCelebrities(listParams);
      setOffset(updateQueryParamsInitialState.offset);
    }
  }, [fetchCelebrities, listParams, previousPath]);

  const fetchMoreData = () => {
    const { limit } = updateQueryParamsInitialState;
    const nextOffset = offset ? offset + limit : limit;
    const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
    setOffset(newOffset);
    fetchCelebrities({
      ...listParams,
      offset: newOffset
    });
    GTM.tagManagerDataLayer("FETCH_MORE_CELEBRITIES_RESULTS", {
      widget: "CelebritiesResultsPage",
      path: window.location.pathname,
      listParams,
      totalResults,
      offset: newOffset
    });
  };

  const isSearchingByKeyword = Boolean(listParams.search);

  return (
    <div className="CelebritiesResultsPage">
      <PageContainer
        showFooter={false}
        queryParams={listParams}
        showSearch={isSearchingByKeyword}
        applyFetchUserCelebrityLikes
        showFiltersSection={!isSearchingByKeyword}
      >
        {!isCompleted && offset <= 0 ? (
          <CelebritiesResultsShimmerCardsLayout />
        ) : (
          <CelebritiesResultsLayout
            celebrities={celebrities}
            queryParams={listParams}
            fetchMoreData={fetchMoreData}
            totalResults={totalResults}
          />
        )}
        <CelebritiesAdditionalResultsLayout
          searchCelebrities={celebrities}
          listParams={listParams}
          isCompleted={isCompleted}
          totalResults={totalResults}
          isSearchingByKeyword={isSearchingByKeyword}
        />
      </PageContainer>
    </div>
  );
};

const _CelebritiesResultsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CelebritiesResultsPage));

export { _CelebritiesResultsPage as CelebritiesResultsPage };
