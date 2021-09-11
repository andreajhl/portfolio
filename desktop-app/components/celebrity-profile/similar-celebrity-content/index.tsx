import Maybe from "desktop-app/components/common/helpers/maybe";
import { SimilarCelebritiesCardsReel } from "desktop-app/components/celebrity-profile/similar-celebrities-cards-reel";
import { CelebritySimilarVideosReel } from "desktop-app/components/celebrity-profile/celebrity-similar-videos-reel";
import { celebrityType } from "desktop-app/types/celebrityType";
import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
import { CSSProperties } from "react";

const mapStateToProps = ({ celebrities }: RootState) => {
  const publicContracts = celebrities.fetchPublicContractsReducer.data.results;
  const isLoadingPublicContracts =
    celebrities.fetchPublicContractsReducer.loading;

  const showSimilarCelebritiesCards =
    !isLoadingPublicContracts && publicContracts?.length > 0;

  return {
    showSimilarCelebritiesCards,
  };
};

const connector = connect(mapStateToProps);

type PropFromRedux = ConnectedProps<typeof connector>;

type SimilarCelebrityContentProps = {
  className?: string;
  celebrity: celebrityType;
  showSimilarCelebritiesCards: boolean;
  sidesPadding?: CSSProperties["width"];
} & PropFromRedux;

function SimilarCelebrityContent({
  className,
  celebrity,
  showSimilarCelebritiesCards,
  sidesPadding,
}: SimilarCelebrityContentProps) {
  return (
    <Maybe it={celebrity.showSimilarCelebrities}>
      <Maybe
        it={showSimilarCelebritiesCards}
        orElse={
          <CelebritySimilarVideosReel
            className={className}
            celebrityUsername={celebrity.username}
            sidesPadding={sidesPadding}
          />
        }
      >
        <SimilarCelebritiesCardsReel
          className={className}
          celebrityUsername={celebrity.username}
          sidesPadding={sidesPadding}
        />
      </Maybe>
    </Maybe>
  );
}

const _SimilarCelebrityContent = connector(SimilarCelebrityContent);

export { _SimilarCelebrityContent as SimilarCelebrityContent };
