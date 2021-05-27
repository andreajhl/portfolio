import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import CelebritySectionVideoCard from "desktop-app/components/layouts/celebrity-section-video-card";
import CelebritySectionVideoCardSkeleton from "desktop-app/components/layouts/celebrity-section-video-card/skeleton";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import { getCelebrityFromSimilarCelebrity } from "lib/utils/getCelebrityFromSimilarCelebrity";
import { useEffect } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchSimilarContracts } from "react-app/src/state/ducks/contracts/actions";
import { RootState } from "react-app/src/state/store";
import { connect } from "react-redux";

function renderVideoCard(similarVideo) {
  if (!similarVideo) return <CelebritySectionVideoCardSkeleton />;
  const celebrity = getCelebrityFromSimilarCelebrity(similarVideo);
  return (
    <CelebritySectionVideoCard
      username={celebrity.username}
      videoUrl={similarVideo?.contractMediaUrl}
      fullName={celebrity.fullName}
      videoPosterUrl={similarVideo?.contractPosterUrl}
      occasion={similarVideo?.occasion}
      avatar={celebrity.avatar}
    />
  );
}

const mapStateToProps = (state: RootState) => {
  const isLoading = state.contracts.fetchSimilarContractsReducer.loading;
  return {
    isLoading,
    similarVideos: isLoading
      ? getArrayOfLength(10)
      : state.contracts.fetchSimilarContractsReducer.data.results,
  };
};

const mapDispatchToProps = {
  getSimilarVideos: fetchSimilarContracts,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritySimilarVideosReelProps = {
  celebrityUsername: string;
} & StateProps &
  DispatchProps;

function CelebritySimilarVideosReel({
  celebrityUsername,
  similarVideos,
  getSimilarVideos,
}: CelebritySimilarVideosReelProps) {
  useEffect(() => {
    if (!celebrityUsername) return;
    getSimilarVideos(celebrityUsername);
  }, []);

  return (
    <Maybe it={similarVideos?.length > 0}>
      <CardsReelSection
        title="Las personas que vieron este perfil también vieron"
        itemData={similarVideos}
        itemCount={similarVideos?.length}
        itemWidth={263}
        itemHeight={402}
        buttonsStyle={{
          size: 49,
          top: 176,
          transform: "translateY(-50%)",
        }}
        gap={26.75}
      >
        {renderVideoCard}
      </CardsReelSection>
    </Maybe>
  );
}

const _CelebritySimilarVideosReel = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritySimilarVideosReel);

export { _CelebritySimilarVideosReel as CelebritySimilarVideosReel };
