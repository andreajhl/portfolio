import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CLIENT_FAVORITES } from "../../../routing/Paths";
import { fetchUserCelebrityLikesWithOffset } from "../../../state/ducks/celebrity-likes/actions";
import Maybe from "../../common/helpers/maybe";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";

const mapStateToProps = ({ celebrityLikes, celebritySections }) => ({
  ...celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data,
  isLoading: celebritySections.fetchCelebritySectionsReducer.loading
});

const mapDispatchToProps = { fetchUserCelebrityLikesWithOffset };

const UserLikesSectionLayout = ({
  results,
  totalResults,
  isLoading,
  fetchUserCelebrityLikesWithOffset
}) => {
  useEffect(() => {
    fetchUserCelebrityLikesWithOffset({ offset: 0, limit: 10 });
  }, []);

  return (
    <Maybe it={!isLoading && results.length > 0}>
      <CelebritiesCardsSectionLayout
        celebritiesSection={{
          id: "favorites",
          celebritySectionType: "CELEBRITY_CARD",
          celebrities: results,
          title: "Tus Favoritos"
        }}
        hasMoreResults={results.length < totalResults}
        moreResultsPath={CLIENT_FAVORITES}
      />
    </Maybe>
  );
};

UserLikesSectionLayout.defaultProps = {
  results: []
};

const _UserLikesSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLikesSectionLayout);

export { _UserLikesSectionLayout as UserLikesSectionLayout };
