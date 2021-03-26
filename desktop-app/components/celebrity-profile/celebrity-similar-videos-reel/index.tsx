import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import CelebritySectionVideoCard from "desktop-app/components/layouts/celebrity-section-video-card";
import { getCelebrityFromSimilarCelebrity } from "lib/utils/getCelebrityFromSimilarCelebrity";
import { useEffect } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchSimilarContracts } from "react-app/src/state/ducks/contracts/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  isLoading: state.contracts.fetchSimilarContractsReducer.loading,
  similarVideos: state.contracts.fetchSimilarContractsReducer.data.results
});

const mapDispatchToProps = {
  getSimilarVideos: fetchSimilarContracts
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CelebritySimilarVideosReelProps = {
  celebrityUsername: string;
} & StateProps &
  DispatchProps;

function renderVideoCard(similarVideo) {
  const celebrity = getCelebrityFromSimilarCelebrity(similarVideo);
  return (
    <CelebritySectionVideoCard
      username={celebrity.username}
      videoUrl={similarVideo.contractMediaUrl}
      fullName={celebrity.fullName}
      videoPosterUrl={similarVideo.contractPosterUrl}
      avatar={celebrity.avatar}
    />
  );
}

function CelebritySimilarVideosReel({
  celebrityUsername,
  similarVideos,
  getSimilarVideos
}: CelebritySimilarVideosReelProps) {
  useEffect(() => {
    if (!celebrityUsername) return;
    getSimilarVideos(celebrityUsername);
  }, []);

  return (
    <Maybe it={similarVideos.length > 0}>
      <CardsReelSection
        title="Las personas que vieron este perfil también vieron"
        itemData={similarVideos}
        itemCount={similarVideos?.length}
        itemWidth={263}
        itemHeight={400}
        buttonsStyle={{
          size: 49,
          top: 175,
          transform: "translateY(-50%)"
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
