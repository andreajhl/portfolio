import { connect, ConnectedProps } from "react-redux";
import { CardsReelSection } from "../../layouts/cards-section-reel";
import { fetchSimilarCelebritiesV2 } from "react-app/src/state/ducks/celebrities/actions";
import { useEffect } from "react";
import { CelebrityCard } from "../../common/cards/celebrity";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import { CelebrityCardSkeleton } from "desktop-app/components/common/cards/celebrity/skeleton";
import { defineMessages, useIntl } from "react-intl";
import { analytics } from "react-app/src/state/utils/gtm";
import { getWindowPathname } from "react-app/src/utils/getWindow";

const messages = defineMessages({
  similarCelebritiesReelTitle: {
    defaultMessage: "Famosos similares",
  },
});

const celebrityCardProps = {
  thumbnailWidth: 202,
  thumbnailHeight: 250,
  showPrice: false,
};

const mapStateToProps = ({ celebrities }) => {
  const isLoading = Boolean(celebrities.fetchSimilarCelebritiesReducer.loading);
  return {
    isLoading,
    similarCelebrities: !isLoading
      ? celebrities.fetchSimilarCelebritiesReducer.data.results
      : getArrayOfLength(10),
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
  isLoading,
  fetchSimilarCelebrities,
}: SimilarCelebritiesCardsReelProps) {
  const { formatMessage } = useIntl();
  useEffect(() => {
    fetchSimilarCelebrities(celebrityUsername);
  }, [celebrityUsername, fetchSimilarCelebrities]);

  const similarCelebritiesReelTitle = formatMessage(
    messages.similarCelebritiesReelTitle
  );

  function trackCelebrityCardClick(celebrity) {
    analytics.track("CLICK_ON_CELEBRITY_CARD", {
      ...celebrity,
      path: getWindowPathname(),
      celebritySectionData: {
        celebritySectionType: "SIMILAR_CELEBRITIES",
        title: similarCelebritiesReelTitle,
        celebrityUsername,
      },
    });
  }

  return (
    <Maybe it={similarCelebrities?.length > 0}>
      <CardsReelSection
        className={styles.SimilarCelebritiesCardsReel}
        title={similarCelebritiesReelTitle}
        itemWidth={202}
        itemHeight={310}
        itemCount={similarCelebrities?.length}
        itemData={similarCelebrities}
        buttonsStyle={{
          top: 105,
          size: 40,
        }}
        gap={31}
      >
        {(similarCelebrity) => (
          <Maybe
            it={!isLoading}
            orElse={<CelebrityCardSkeleton {...celebrityCardProps} />}
          >
            <CelebrityCard
              onClickLink={() => trackCelebrityCardClick(similarCelebrity)}
              celebrity={similarCelebrity}
              {...celebrityCardProps}
            />
          </Maybe>
        )}
      </CardsReelSection>
    </Maybe>
  );
}

export default SimilarCelebritiesCardsReel;

const _SimilarCelebritiesCardsReel = connector(SimilarCelebritiesCardsReel);

export { _SimilarCelebritiesCardsReel as SimilarCelebritiesCardsReel };
