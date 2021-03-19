import { CategoryCard } from "desktop-app/components/common/cards/category";
import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import ContractVideo from "desktop-app/components/common/cards/contract-video";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import React from "react";
import { CardsReelSection } from "../cards-section-reel";
import { ReelProps } from "../reel";

type CelebritiesSectionProps = {
  celebritySection: CelebritySectionType;
};

const celebrityTypeReelProps: { [key: string]: ReelProps } = {
  CELEBRITY_CARD: {
    itemWidth: 170,
    itemHeight: 288,
    buttonsStyle: {
      size: 35,
      top: 105,
      transform: "translateY(-50%)"
    },
    gap: 18,
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
    gap: 19,
    children: (celebrity) => <ContractVideo celebrity={celebrity} />
  },
  CATEGORY_CARD: {
    itemWidth: 212,
    itemHeight: 121,
    buttonsStyle: {
      size: 35,
      top: 45,
      transform: "translateY(-50%)"
    },
    gap: 12,
    children: (category) => <CategoryCard category={category} />
  }
};

function CelebritiesSection({ celebritySection }: CelebritiesSectionProps) {
  const reelProps =
    celebrityTypeReelProps[celebritySection.celebritySectionType];

  return (
    <CardsReelSection
      title={celebritySection.title}
      itemCount={celebritySection.celebrities.length}
      itemData={celebritySection.celebrities}
      itemWidth={reelProps.itemWidth}
      itemHeight={reelProps.itemHeight}
      buttonsStyle={reelProps.buttonsStyle}
      gap={reelProps.gap}
      className="mb-4"
    >
      {reelProps.children}
    </CardsReelSection>
  );
}

export default CelebritiesSection;
