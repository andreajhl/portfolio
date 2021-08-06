import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import CelebritySectionVideoCard from "desktop-app/components/layouts/celebrity-section-video-card";
import CelebritySectionVideoCardSkeleton from "desktop-app/components/layouts/celebrity-section-video-card/skeleton";
import SimilarContractType from "desktop-app/types/similarContractType";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import { useEffect } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchSimilarContractsV2 } from "react-app/src/state/ducks/contracts/actions";
import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  similarVideosReelTitle: {
    defaultMessage: "Las personas que vieron este perfil también vieron",
  },
});

const buttonStyle = {
  size: 49,
  top: 176,
  transform: "translateY(-50%)",
};

function renderVideoCard(similarVideo: SimilarContractType | null) {
  if (!similarVideo) return <CelebritySectionVideoCardSkeleton />;
  return (
    <CelebritySectionVideoCard
      username={similarVideo?.celebrityUsername}
      videoUrl={similarVideo?.contractMediaUrl}
      fullName={similarVideo?.celebrityFullName}
      videoPosterUrl={similarVideo?.contractPosterUrl}
      occasion={similarVideo?.contractOccasion}
      avatar={similarVideo?.celebrityAvatar}
      contract_reference={similarVideo?.contractReference}
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
  getSimilarVideos: fetchSimilarContractsV2,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CelebritySimilarVideosReelProps = {
  celebrityUsername: string;
} & PropsFromRedux;

function CelebritySimilarVideosReel({
  celebrityUsername,
  similarVideos,
  getSimilarVideos,
}: CelebritySimilarVideosReelProps) {
  const { formatMessage } = useIntl();
  useEffect(() => {
    if (!celebrityUsername) return;
    getSimilarVideos(celebrityUsername);
  }, []);

  const similarVideosReelTitle = formatMessage(messages.similarVideosReelTitle);

  return (
    <Maybe it={similarVideos?.length > 0}>
      <CardsReelSection
        title={similarVideosReelTitle}
        itemData={similarVideos}
        itemCount={similarVideos?.length}
        itemWidth={263}
        itemHeight={402}
        buttonsStyle={buttonStyle}
        gap={27.333}
      >
        {renderVideoCard}
      </CardsReelSection>
    </Maybe>
  );
}

const _CelebritySimilarVideosReel = connector(CelebritySimilarVideosReel);

export { _CelebritySimilarVideosReel as CelebritySimilarVideosReel };
