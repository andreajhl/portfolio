import { SEARCH_PATH } from "constants/paths";
import { CategoryCard } from "desktop-app/components/common/cards/category";
import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { useMemo } from "react";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";
import getMoreFrequentIds from "react-app/src/utils/getMoreFrequentIds";
import { CardsReelSection, CardsReelSectionProps } from "../cards-section-reel";
import CelebritySectionVideoCard from "../celebrity-section-video-card";
import styles from "./styles.module.scss";

type CelebritiesSectionProps = {
  celebritySection: CelebritySectionType;
};

const celebrityTypeReelProps: {
  [key: string]: Omit<
    CardsReelSectionProps,
    "itemCount" | "itemData" | "itemCount"
  >;
} = {
  CELEBRITY_CARD: {
    itemWidth: 170,
    itemHeight: 284,
    buttonsStyle: {
      size: 35,
      top: 105,
      transform: "translateY(-50%)"
    },
    gap: 22.5,
    children: (celebrity) => <CelebrityCard celebrity={celebrity} />
  },
  MAIN_VIDEO_1: {
    itemWidth: 263,
    itemHeight: 400,
    buttonsStyle: {
      size: 49,
      top: 175,
      transform: "translateY(-50%)"
    },
    gap: 26.75,
    children: (celebrityVideo) => (
      <CelebritySectionVideoCard
        occasion={celebrityVideo.occasion}
        username={celebrityVideo.username}
        videoUrl={celebrityVideo.videoUrl}
        fullName={celebrityVideo.fullName}
        videoPosterUrl={celebrityVideo.videoPosterUrl}
        avatar={celebrityVideo.avatar}
      />
    )
  },
  CATEGORY_CARD: {
    itemWidth: 212,
    itemHeight: 121,
    buttonsStyle: {
      size: 35,
      top: 60.5,
      transform: "translateY(-50%)"
    },
    gap: 18,
    children: (category) => <CategoryCard category={category} />
  }
};

function CelebritiesSection({ celebritySection }: CelebritiesSectionProps) {
  const { celebrities, celebritySectionType } = celebritySection;

  const searchMoreResultsPath = useMemo(() => {
    if (
      (!celebrities && celebrities.length < 10) ||
      celebritySectionType === "CATEGORY_CARD"
    )
      return null;
    return (
      SEARCH_PATH +
      jsonToQueryString({
        country_id: getMoreFrequentIds(celebrities, "countryId"),
        category_id: getMoreFrequentIds(celebrities, "categoryId"),
        limit: 20
      })
    );
  }, [celebrities, celebritySectionType]);

  const reelProps = celebrityTypeReelProps[celebritySectionType];

  return (
    <CardsReelSection
      title={
        <h2 className={styles.CelebritiesSectionTitle}>
          {celebritySection.title}
        </h2>
      }
      showMorePath={searchMoreResultsPath}
      itemCount={celebritySection.celebrities.length}
      itemData={celebritySection.celebrities}
      itemWidth={reelProps.itemWidth}
      itemHeight={reelProps.itemHeight}
      buttonsStyle={reelProps.buttonsStyle}
      gap={reelProps.gap}
      className={styles.CelebritiesSection}
    >
      {reelProps.children}
    </CardsReelSection>
  );
}

export default CelebritiesSection;
