import AvatarWithName from "desktop-app/components/common/avatar-with-name";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import classes from "classnames";
import {
  addOrRemoveLike,
  fetchUserCelebrityLikesWithOffset,
} from "react-app/src/state/ducks/celebrity-likes/actions";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { connect } from "react-redux";
import { CLIENT_FAVORITES } from "constants/paths";

const mapStateToProps = ({ celebrityLikes, celebritySections }) => ({
  ...celebrityLikes.fetchUserCelebrityLikesWithOffsetReducer.data,
  isLoading: celebritySections.fetchCelebritySectionsReducer.loading,
});

const mapDispatchToProps = {
  fetchUserCelebrityLikesWithOffset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritiesFavoritesEditProps = StateProps & DispatchProps;
function CelebritiesFavoritesEdit({
  results,
  totalResults,
  isLoading,
  fetchUserCelebrityLikesWithOffset,
}: CelebritiesFavoritesEditProps) {
  useEffect(() => {
    fetchUserCelebrityLikesWithOffset({ offset: 0, limit: 10 });
  }, []);

  const deleteFavorite = async (celebrityId: number) => {
    const response = await addOrRemoveLike(celebrityId);
    if (response.status === "OK")
      fetchUserCelebrityLikesWithOffset({ offset: 0, limit: 10 });
  };

  return (
    <Maybe it={!isLoading && results.length > 0}>
      <div className={styles.CelebritiesFavoritesEditContainer}>
        <CardsReelSection
          itemWidth={88}
          itemHeight={151}
          gap={34}
          title={"Famosos Favoritos"}
          itemCount={results.length}
          itemData={results}
          buttonsStyle={{ size: 35, top: 36 }}
          showMorePath={results.length < totalResults ? CLIENT_FAVORITES : ""}
        >
          {(data) => (
            <div className={styles.CelebrityFavoriteAvatar}>
              <AvatarWithName
                src={data.avatar}
                imgAlt={`Foto de ${data.fullName}`}
                name={data.fullName}
              />
              <button
                onClick={() => deleteFavorite(data.id)}
                className={classes("btn", styles.DeleteButton)}
              >
                Eliminar
              </button>
            </div>
          )}
        </CardsReelSection>
      </div>
    </Maybe>
  );
}

const _CelebritiesFavoritesEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesFavoritesEdit);

export { _CelebritiesFavoritesEdit as CelebritiesFavoritesEdit };
