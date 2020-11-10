import React, { useState, useEffect } from "react";
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
import { useMemo } from "react";
import { Redirect } from "react-router";
import { ROOT_PATH } from "../../../routing/Paths";

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    celebrities: celebrities.fetchCelebritiesReducer.data.results
  };
};

const mapDispatchToProps = { fetchCelebrities: celebrityOperations.list };

const pageTitle = "Famosos.com - Todos los Famosos";
const pageDescription =
  "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.";

const offsetInitialValue = 0;
const resultsLimit = 10;

const CelebritiesResultsPage = ({
  fetchCelebrities,
  isLoading,
  celebrities,
  location,
  history
}) => {
  const queryString = location.search;
  const listParams = useMemo(() => queryStringToJSON(queryString), [
    queryString
  ]);

  useEffect(() => {
    if (!queryString) return history.push(ROOT_PATH);
    fetchCelebrities(listParams);
  }, [listParams]);

  const fetchMoreData = () => {
    // setParams((offset) => offset + resultsLimit);
  };

  return (
    <div className="CelebritiesResultsPage">
      <MetaTags>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </MetaTags>
      <PageContainer showFooter={false} queryParams={listParams}>
        <FiltersSectionLayout queryParams={listParams} />
        {isLoading ? (
          <CelebritiesResultsShimmerCardsLayout />
        ) : (
          <CelebritiesResultsLayout
            celebrities={celebrities}
            queryParams={listParams}
            fetchMoreData={fetchMoreData}
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
