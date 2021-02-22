import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { FiltersSectionLayout } from "../../layouts/filters-section";
import { CelebritiesResultsShimmerCardsLayout } from "../../layouts/celebrities-results-shimmer-cards";
import { CelebritiesResultsLayout } from "../../layouts/celebrities-results";
import { fetchUserCelebrityLikesWithOffset } from "../../../state/ducks/celebrity-likes/actions";
import Maybe from "../../common/helpers/maybe";

const mapStateToProps = ({ celebrityLikes }) => ({
  results: celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data.results,
  totalResults:
    celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data.totalResults,
  isLoading: celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.loading
});

const mapDispatchToProps = { fetchUserCelebrityLikesWithOffset };

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
      <PageContainer showFooter={false} showSearch applyFetchUserCelebrityLikes>
        <FiltersSectionLayout />
        <Maybe
          it={!isLoading && offset >= 0}
          orElse={<CelebritiesResultsShimmerCardsLayout />}
        >
          <CelebritiesResultsLayout
            celebrities={results}
            fetchMoreData={fetchMoreData}
            totalResults={totalResults}
          />
        </Maybe>
      </PageContainer>
    </div>
  );
};

const _ClientFavorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientFavoritesPage);

export { _ClientFavorites as ClientFavorites };
