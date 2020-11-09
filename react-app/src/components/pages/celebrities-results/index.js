import React, { useEffect } from "react";
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

const CelebritiesResultsPage = ({
  fetchCelebrities,
  isLoading,
  celebrities,
  location
}) => {
  const queryString = location.search;
  const listParams = useMemo(() => queryStringToJSON(queryString), [
    queryString
  ]);
  useEffect(() => {
    fetchCelebrities(listParams);
  }, [listParams]);
  if (!queryString) return <Redirect to={ROOT_PATH} />;

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
          <CelebritiesResultsLayout celebrities={celebrities} />
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
