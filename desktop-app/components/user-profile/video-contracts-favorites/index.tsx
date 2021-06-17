import React, { useEffect } from "react";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import CelebritySectionVideoCard from "desktop-app/components/layouts/celebrity-section-video-card";
import styles from "./styles.module.scss";
import { RootState } from "react-app/src/state/store";
import { fetchUserFavoritesContracts } from "react-app/src/state/ducks/account/actions";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "desktop-app/components/common/helpers/maybe";
import CelebritySectionVideoCardSkeleton from "desktop-app/components/layouts/celebrity-section-video-card/skeleton";

const mapStateToProps = ({ account }: RootState) => ({
  informationPage:
    account.fetchUserFavoritesContractsReducer.data.informationPage,
  results: account.fetchUserFavoritesContractsReducer.data.results,
  isLoading: account.fetchUserFavoritesContractsReducer.loading,
  isCompleted: account.fetchUserFavoritesContractsReducer.completed,
});

const mapDispatchToProps = {
  fetchUserFavoritesContracts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type VideoContractsFavoritesProps = PropsFromRedux;

function VideoContractsFavorites({
  fetchUserFavoritesContracts,
  isLoading,
  informationPage,
  results,
  isCompleted,
}: VideoContractsFavoritesProps) {
  useEffect(() => {
    fetchUserFavoritesContracts();
  }, []);

  if (isCompleted && results?.length === 0) return null;
  return (
    <div className={styles.VideoContractsFavoritesWrapper}>
      <CardsReelSection
        title={<h2 className={styles.ContainerTitle}>Video Favoritos</h2>}
        itemWidth={263}
        itemHeight={!isLoading ? 402 : 410}
        buttonsStyle={{
          size: 49,
          top: 171,
          transform: "translateY(-50%)",
        }}
        gap={27.333}
        itemCount={results?.length}
        itemData={results}
      >
        {(data) => (
          <Maybe it={!isLoading} orElse={<CelebritySectionVideoCardSkeleton />}>
            <CelebritySectionVideoCard
              occasion={data.occasion}
              username={data.username}
              videoUrl={data.videoUrl}
              fullName={data.fullname}
              videoPosterUrl={data.videoPosterUrl}
              avatar={data.avatar}
              contract_reference={data.contractReference}
            />
          </Maybe>
        )}
      </CardsReelSection>
    </div>
  );
}
const _VideoContractsFavorites = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoContractsFavorites);

export { _VideoContractsFavorites as VideoContractsFavorites };
