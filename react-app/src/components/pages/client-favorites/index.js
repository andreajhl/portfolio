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
import { fetchUserCelebrityLikesWithOffset } from "../../../state/ducks/celebrity-likes/actions";

const mapStateToProps = ({ celebrityLikes }) => ({
  ...celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data,
  isLoading: celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.loading
});

const mapDispatchToProps = { fetchUserCelebrityLikesWithOffset };

const pageTitle = "Famosos.com - Mis Famosos Favoritos";
const pageDescription =
  "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.";

const initialState = {
  offset: 0,
  limit: 20
};

const ClientFavoritesPage = ({
  results,
  totalResults,
  fetchUserCelebrityLikesWithOffset,
  isLoading
}) => {
  const [offset, setOffset] = useState(initialState.offset);

  useEffect(() => {
    fetchUserCelebrityLikesWithOffset({ offset, limit: initialState.limit });
    setOffset(initialState.offset);
  }, []);

  const fetchMoreData = () => {
    const { limit } = initialState;
    const newOffset = offset ? offset + limit : limit;
    setOffset(newOffset < totalResults ? newOffset : totalResults);
    fetchUserCelebrityLikesWithOffset({
      offset: newOffset < totalResults ? newOffset : totalResults,
      limit
    });
  };

  return (
    <div className="CelebritiesResultsPage">
      <MetaTags>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </MetaTags>
      <PageContainer showFooter={false} showSearch applyFetchUserCelebrityLikes>
        <FiltersSectionLayout />
        {isLoading && offset <= 0 ? (
          <CelebritiesResultsShimmerCardsLayout />
        ) : (
          <CelebritiesResultsLayout
            celebrities={results}
            fetchMoreData={fetchMoreData}
            totalResults={totalResults}
          />
        )}
      </PageContainer>
    </div>
  );
};

const _ClientFavorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientFavoritesPage);

export { _ClientFavorites as ClientFavorites };
