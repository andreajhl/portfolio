import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserCelebrityLikesWithOffset } from "../../../state/ducks/celebrity-likes/actions";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";

const mapStateToProps = ({ celebrityLikes }) => ({
  ...celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data
});

const mapDispatchToProps = { fetchUserCelebrityLikesWithOffset };

const UserLikesSectionLayout = ({
  results,
  totalResults,
  fetchUserCelebrityLikesWithOffset
}) => {
  useEffect(() => {
    fetchUserCelebrityLikesWithOffset({ offset: 0, limit: 10 });
  }, []);

  return results.length > 0 ? (
    <CelebritiesCardsSectionLayout
      celebritiesSection={{
        celebritySectionType: "CELEBRITY_CARD",
        celebrities: results,
        title: "Tus Favoritos"
      }}
      hasMoreResults={results.length < totalResults}
      moreResultsPath={"/my-account/favs"}
    />
  ) : null;
};

UserLikesSectionLayout.defaultProps = {
  results: []
};

const _UserLikesSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLikesSectionLayout);

export { _UserLikesSectionLayout as UserLikesSectionLayout };
