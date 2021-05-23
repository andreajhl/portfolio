import { connect, ConnectedProps } from "react-redux";
import { CardsReelSection } from "../../layouts/cards-section-reel";
import { fetchSimilarCelebritiesV2 } from "react-app/src/state/ducks/celebrities/actions";
import { useEffect } from "react";
import { CelebrityCard } from "../../common/cards/celebrity";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results,
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities: fetchSimilarCelebritiesV2,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type SimilarCelebritiesCardsReelProps = {
  celebrityUsername: string;
} & PropsFromRedux;

function SimilarCelebritiesCardsReel({
  celebrityUsername,
  similarCelebrities,
  fetchSimilarCelebrities,
}: SimilarCelebritiesCardsReelProps) {
  useEffect(() => {
    fetchSimilarCelebrities(celebrityUsername);
  }, [celebrityUsername, fetchSimilarCelebrities]);

  return (
    <Maybe it={similarCelebrities.length > 0}>
      <CardsReelSection
        className={styles.SimilarCelebritiesCardsReel}
        title="Famosos similares"
        itemWidth={202}
        itemHeight={310}
        itemCount={similarCelebrities.length}
        itemData={similarCelebrities}
        buttonsStyle={{
          top: 105,
          size: 40,
        }}
        gap={31}
      >
        {(similarCelebrity) => (
          <CelebrityCard
            thumbnailWidth={202}
            thumbnailHeight={250}
            showPrice={false}
            celebrity={similarCelebrity}
          />
        )}
      </CardsReelSection>
    </Maybe>
  );
}

export default SimilarCelebritiesCardsReel;

const _SimilarCelebritiesCardsReel = connector(SimilarCelebritiesCardsReel);

export { _SimilarCelebritiesCardsReel as SimilarCelebritiesCardsReel };
