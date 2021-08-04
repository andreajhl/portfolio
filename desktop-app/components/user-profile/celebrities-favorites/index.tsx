import AvatarWithName from "desktop-app/components/common/avatar-with-name";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { CelebritiesFavoritesEditReelSkeleton } from "./skeleton";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import classes from "classnames";
import { addOrRemoveLike } from "react-app/src/state/ducks/celebrity-likes/actions";
import { fetchUserFavoritesCelebrities } from "react-app/src/state/ducks/account/actions";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { connect } from "react-redux";
import { CLIENT_FAVORITES } from "constants/paths";
import { RootState } from "react-app/src/state/store";
import { FormattedMessage } from "react-intl";

const mapStateToProps = ({ account }: RootState) => ({
  informationPage:
    account.fetchUserFavoritesCelebritiesReducer.data.informationPage,
  results: account.fetchUserFavoritesCelebritiesReducer.data.results,
  isLoading: account.fetchUserFavoritesCelebritiesReducer.loading,
  isCompleted: account.fetchUserFavoritesCelebritiesReducer.completed,
});

const mapDispatchToProps = {
  fetchUserFavoritesCelebrities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritiesFavoritesEditProps = StateProps & DispatchProps;
function CelebritiesFavoritesEdit({
  results,
  isCompleted,
  isLoading,
  informationPage,
  fetchUserFavoritesCelebrities,
}: CelebritiesFavoritesEditProps) {
  useEffect(() => {
    fetchUserFavoritesCelebrities();
  }, []);

  const deleteFavorite = async (celebrityId: number) => {
    const response = await addOrRemoveLike(celebrityId);
    if (response.status !== "OK") return;
    fetchUserFavoritesCelebrities();
  };

  if (!isLoading && isCompleted && results.length === 0) return null;

  return (
    <div className={styles.CelebritiesFavoritesEditContainer}>
      <Maybe
        it={!isLoading && isCompleted}
        orElse={<CelebritiesFavoritesEditReelSkeleton />}
      >
        <CardsReelSection
          itemWidth={88}
          itemHeight={151}
          gap={34}
          title="Famosos Favoritos"
          itemCount={results.length}
          itemData={results}
          buttonsStyle={{ size: 35, top: 36 }}
          showMorePath={informationPage.totalPages < 1 ? CLIENT_FAVORITES : ""}
        >
          {(data) => (
            <div className={styles.CelebrityFavoriteAvatar}>
              <AvatarWithName
                src={data.avatar}
                imgAlt={`Foto de ${data.fullName}`}
                name={data.fullName}
                username={data.username}
              />
              <button
                onClick={() => deleteFavorite(data.id)}
                className={classes("btn", styles.DeleteButton)}
              >
                <FormattedMessage defaultMessage="Eliminar" />
              </button>
            </div>
          )}
        </CardsReelSection>
      </Maybe>
    </div>
  );
}

const _CelebritiesFavoritesEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesFavoritesEdit);

export { _CelebritiesFavoritesEdit as CelebritiesFavoritesEdit };
