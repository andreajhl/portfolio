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
import { cursorOperations } from "../../../state/ducks/cursor-position";

function noop() {}
const PATH_KEY = "CelebritiesResultPage";
const mapStateToProps = ({ celebrities, cursor }) => {
  return {
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    isCompleted: celebrities.fetchCelebritiesReducer.completed,
    requestCancel: celebrities.fetchCelebritiesReducer.requestCancel || noop,
    celebrities: celebrities.fetchCelebritiesReducer.data.results,
    totalResults: celebrities.fetchCelebritiesReducer.data.totalResults,
    queryParamsStore: celebrities.saveLastQueryParamsReducer,
    previousPath: celebrities.previousPathReducer.pathname,
    cursor: cursor.positionReducer.data
  };
};

const mapDispatchToProps = {
  fetchCelebrities: celebrityOperations.list,
  saveQueryParams: celebrityOperations.saveLastQueryParams,
  saveCursor: cursorOperations.saveCursorPosition
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
  cursor,
  history,
  saveCursor,
  saveQueryParams,
  queryParamsStore
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
  console.log(queryParamsStore, "queryParamsStore");
  console.log(listParams);
  useEffect(() => {
    if (hasSearched) {
      if (cursor.view === PATH_KEY) {
        window.scrollTo({ top: cursor.position, behavior: "smooth" });
      }
    }
    return () => {
      saveCursor({
        view: PATH_KEY,
        position: window.scrollY
      });
    };
  }, []);

  useEffect(() => requestCancel, [requestCancel]);

  useEffect(() => {
    if (Object.keys(listParams).length === 0 || !hasSearched(listParams)) {
      history.push(previousPath);
    } else {
      if (queryParamsStore.search !== listParams?.search) {
        fetchCelebrities(listParams);
        setOffset(updateQueryParamsInitialState.offset);
      } else {
        setOffset(
          queryParamsStore?.offset
            ? queryParamsStore?.offset
            : updateQueryParamsInitialState.offset
        );
      }
    }
  }, [fetchCelebrities, listParams, previousPath]);

  const fetchMoreData = () => {
    const { limit } = updateQueryParamsInitialState;
    const nextOffset = offset ? offset + limit : limit;
    const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
    setOffset(newOffset);
    saveQueryParams({ offset: newOffset, search: listParams?.search });
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
