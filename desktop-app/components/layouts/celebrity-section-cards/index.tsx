import { SEARCH_PATH } from "constants/paths";
import { CategoryCard } from "desktop-app/components/common/cards/category";
import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { useMemo } from "react";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";
import { analytics } from "react-app/src/state/utils/gtm";
import getMoreFrequentIds from "react-app/src/utils/getMoreFrequentIds";
import getWindow from "react-app/src/utils/getWindow";
import { CardsReelSection, CardsReelSectionProps } from "../cards-section-reel";
import CelebritySectionVideoCard from "../celebrity-section-video-card";
import styles from "./styles.module.scss";

type CelebritiesSectionProps = {
  celebritySection: CelebritySectionType;
};

const celebrityTypeReelProps: {
  [key: string]: {
    getChildren: (...params: any) => CardsReelSectionProps["children"];
  } & Omit<
    CardsReelSectionProps,
    "itemCount" | "itemData" | "itemCount" | "children"
  >;
} = {
  CELEBRITY_CARD: {
    itemWidth: 170,
    itemHeight: 284,
    buttonsStyle: {
      size: 35,
      top: 105,
      transform: "translateY(-50%)",
    },
    gap: 22.8,
    getChildren: (celebritySectionData: CelebritySectionType) => (
      celebrity
    ) => {
      function trackCelebrityCardClick() {
        analytics.track(
          "CLICK_ON_CELEBRITY_CARD",
          Object.assign(
            {
              celebritySectionData,
              path: getWindow().location.pathname,
              widget: "CelebrityCard",
            },
            celebrity
          )
        );
      }
      return (
        <CelebrityCard
          celebrity={celebrity}
          onClickLink={trackCelebrityCardClick}
        />
      );
    },
  },
  MAIN_VIDEO_1: {
    itemWidth: 263,
    itemHeight: 402,
    buttonsStyle: {
      size: 49,
      top: 171,
      transform: "translateY(-50%)",
    },
    gap: 27.333,
    getChildren: (celebritySectionData: CelebritySectionType) => (
      celebrityVideo
    ) => {
      function trackVideoCardClick() {
        analytics.track(
          "CLICK_ON_CELEBRITY_VIDEO_CARD",
          Object.assign(
            {
              celebritySectionData,
              path: getWindow().location.pathname,
              widget: "CelebritySectionVideoCard",
            },
            celebrityVideo
          )
        );
      }
      return (
        <CelebritySectionVideoCard
          occasion={celebrityVideo.occasion}
          username={celebrityVideo.username}
          videoUrl={celebrityVideo.videoUrl}
          fullName={celebrityVideo.fullName}
          videoPosterUrl={celebrityVideo.videoPosterUrl}
          avatar={celebrityVideo.avatar}
          contract_reference={celebrityVideo.contract_reference}
          onClickFooterLink={trackVideoCardClick}
        />
      );
    },
  },
  CATEGORY_CARD: {
    itemWidth: 212,
    itemHeight: 121,
    buttonsStyle: {
      size: 35,
      top: 60.5,
      transform: "translateY(-50%)",
    },
    gap: 18.5,
    getChildren: () => (category) => <CategoryCard category={category} />,
  },
};

function CelebritiesSection({ celebritySection }: CelebritiesSectionProps) {
  const { celebrities, ...celebritySectionData } = celebritySection;
  const { celebritySectionType } = celebritySectionData;

  const searchMoreResultsPath = useMemo(() => {
    if (
      (!celebrities && celebrities.length < 10) ||
      celebritySectionType === "CATEGORY_CARD"
    ) {
      return null;
    }
    return (
      SEARCH_PATH +
      jsonToQueryString({
        country_id: getMoreFrequentIds(celebrities, "countryId"),
        category_id: getMoreFrequentIds(celebrities, "categoryId"),
        limit: 20,
      })
    );
  }, [celebrities, celebritySectionType]);

  const reelProps = celebrityTypeReelProps[celebritySectionType];
  const children = useMemo(
    () => reelProps.getChildren(celebritySectionData),
    []
  );

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
      {children}
    </CardsReelSection>
  );
}

export default CelebritiesSection;
