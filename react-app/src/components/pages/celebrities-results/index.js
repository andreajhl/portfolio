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
import { ROOT_PATH } from "../../../routing/Paths";
import { updateQueryParams } from "../../../state/ducks/contracts/actions";

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    celebrities: celebrities.fetchCelebritiesReducer.data.results,
    totalResults: celebrities.fetchCelebritiesReducer.data.totalResults
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
  location,
  history
}) => {
  const [offset, setOffset] = useState(updateQueryParamsInitialState.offset);
  const queryString = location.search;
  const listParams = useMemo(() => queryStringToJSON(queryString), [
    queryString
  ]);

  useEffect(() => {
    if (!queryString || !hasSearched(listParams))
      return history.push(ROOT_PATH);
    fetchCelebrities(listParams);
    setOffset(updateQueryParamsInitialState.offset);
  }, [listParams]);

  const fetchMoreData = () => {
    const { limit } = updateQueryParamsInitialState;
    const newOffset = offset ? offset + limit : limit;
    setOffset(newOffset < totalResults ? newOffset : totalResults);
    fetchCelebrities({
      ...listParams,
      offset: newOffset < totalResults ? newOffset : totalResults
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
      </PageContainer>
    </div>
  );
};

const _CelebritiesResultsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesResultsPage);

export { _CelebritiesResultsPage as CelebritiesResultsPage };
