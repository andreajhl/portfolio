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
  const listParams = useMemo(() => queryStringToJSON(location.search), [
    location.search
  ]);
  useEffect(() => {
    fetchCelebrities(listParams);
  }, [listParams]);

  return (
    <div className="CelebritiesResultsPage">
      <MetaTags>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </MetaTags>
      <PageContainer showFooter={false}>
        <FiltersSectionLayout queryParams={listParams}/>
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
