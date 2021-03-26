import { connect } from "react-redux";
import { CardsReelSection } from "../../layouts/cards-section-reel";
import { fetchSimilarCelebrities } from "react-app/src/state/ducks/celebrities/actions";
import { useEffect } from "react";
import { CelebrityCard } from "../../common/cards/celebrity";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SimilarCelebritiesCardsReelProps = {
  celebrityUsername: string;
} & StateProps &
  DispatchProps;

const getCelebrityFromSimilarCelebrity = ({
  celebrityId,
  celebrityUsername,
  celebrityFullName,
  celebrityAvatar,
  celebrityHashTags,
  videoMessagePrice,
  availableForFlashDeliveries,
  countryCode,
  categoryId,
  categoryTitle
}: any) => {
  return {
    id: celebrityId,
    avatar: celebrityAvatar,
    username: celebrityUsername,
    fullName: celebrityFullName,
    hashtags: celebrityHashTags,
    videoMessagePrice,
    availableForFlashDeliveries,
    countryCode,
    categoryId,
    title: categoryTitle
  };
};

function SimilarCelebritiesCardsReel({
  celebrityUsername,
  similarCelebrities,
  fetchSimilarCelebrities
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
          size: 40
        }}
        gap={31}
      >
        {(similarCelebrity) => {
          const celebrity = getCelebrityFromSimilarCelebrity(similarCelebrity);
          return (
            <CelebrityCard
              thumbnailWidth={202}
              thumbnailHeight={250}
              showPrice={false}
              celebrity={celebrity}
            />
          );
        }}
      </CardsReelSection>
    </Maybe>
  );
}

export default SimilarCelebritiesCardsReel;

const _SimilarCelebritiesCardsReel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebritiesCardsReel);

export { _SimilarCelebritiesCardsReel as SimilarCelebritiesCardsReel };
