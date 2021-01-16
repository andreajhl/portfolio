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
import { CelebritiesSimilarResultsLayout } from "../../layouts/celebrities-similar-results";
import getMoreFrequentIds from "../../../utils/getMoreFrequentIds";

const CelebritiesAdditionalResults = ({
  isCompleted,
  totalResults,
  isSearchingByKeyword,
  searchCelebrities
}) => {
  const similarResultsParams = useMemo(() => {
    if (searchCelebrities.length === 0)
      return {
        country_id:
          "156,30" || getMoreFrequentIds(searchCelebrities, "countryId"),
        category_id: "4" || getMoreFrequentIds(searchCelebrities, "categoryId"),
        limit: updateQueryParamsInitialState.limit
      };
    return {
      country_id:
        "156,30" || getMoreFrequentIds(searchCelebrities, "countryId"),
      category_id: "4" || getMoreFrequentIds(searchCelebrities, "categoryId"),
      limit: updateQueryParamsInitialState.limit
    };
  }, [searchCelebrities]);
  if (!isCompleted) return null;
  if (!isSearchingByKeyword) return null; // Condicional para mostrar contenido adicional al filtrar
  if (!totalResults)
    // Condicional para mostrar sección de famosos top cuando no hay resultados
    return (
      <CelebritiesSimilarResultsLayout
        similarResultsParams={similarResultsParams}
      />
    );
  if (totalResults >= 6) return null;

  return (
    <CelebritiesSimilarResultsLayout
      similarResultsParams={similarResultsParams}
    />
  );
};

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
  const listParams = useMemo(() => queryStringToJSON(queryString), [
    queryString
  ]);

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
      >
        {!isSearchingByKeyword ? (
          <FiltersSectionLayout
            queryParams={listParams}
            showCleanFiltersButton
          />
        ) : null}
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
        <CelebritiesAdditionalResults
          searchCelebrities={celebrities}
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
