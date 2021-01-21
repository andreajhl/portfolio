import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import {
  PageContainer,
  FiltersSectionLayout,
  CelebritiesResultsShimmerCardsLayout,
  CelebritiesResultsLayout
} from "../../layouts";
import { queryStringToJSON } from "../../../state/utils/apiService";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import * as GTM from "../../../state/utils/gtm";
import { CelebritiesAdditionalResultsLayout } from "../../layouts/celebrities-additional-results";
import pick from "lodash.pick";

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    isCompleted: celebrities.fetchCelebritiesReducer.completed,
    requestCancel: celebrities.fetchCelebritiesReducer.requestCancel,
    celebrities: celebrities.fetchCelebritiesReducer.data.results,
    totalResults: celebrities.fetchCelebritiesReducer.data.totalResults,
    previousPath: celebrities.previousPathReducer.pathname
  };
};

const mapDispatchToProps = {
  fetchCelebrities: celebrityOperations.list
};

const pageTitle = "Famosos.com - Todos los Famosos";
const pageDescription =
  "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.";

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
  "category_id"
];

window.pick = pick;

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
  const queryString = location.search;
  const listParams = useMemo(
    () => pick(queryStringToJSON(queryString), allowedParams),
    [queryString]
  );

  useEffect(() => requestCancel, [requestCancel]);

  useEffect(() => {
    if (!queryString || !hasSearched(listParams)) {
      return history.push(previousPath);
    }
    fetchCelebrities(listParams);
    setOffset(updateQueryParamsInitialState.offset);
  }, [listParams]);

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
      <MetaTags>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </MetaTags>
      <PageContainer
        showFooter={false}
        queryParams={listParams}
        showSearch={isSearchingByKeyword}
        applyFetchUserCelebrityLikes
        showFiltersSection={!isSearchingByKeyword}
      >
        {isLoading && offset <= 0 ? (
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
)(CelebritiesResultsPage);

export { _CelebritiesResultsPage as CelebritiesResultsPage };
