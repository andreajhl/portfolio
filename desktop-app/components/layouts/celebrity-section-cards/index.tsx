import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
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
      top: 105
    },
    gap: 18,
    children: (celebrity) => <CelebrityCard celebrity={celebrity} />
  },
  MAIN_VIDEO_1: {
    
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
    >
      {reelProps.children}
    </CardsReelSection>
  );
}

export default CelebritiesSection;
