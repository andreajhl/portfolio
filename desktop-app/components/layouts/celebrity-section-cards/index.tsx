import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import React from "react";
import { CardsReelSection } from "../cards-section-reel";

const celebrityCardWidth = 150;
const videoCardWidth = 258;
const celebrityCardSectionHeight = 219;
const videoCardSectionHeight = 360;
const cardGap = 12;

type CelebritiesSectionProps = {
  celebritySection: CelebritySectionType;
};

const twoRemInPixels = 32;

function CelebritiesSection({ celebritySection }: CelebritiesSectionProps) {
  return (
    <CardsReelSection
      title={celebritySection.title}
      itemWidth={170}
      itemCount={celebritySection.celebrities.length}
      itemData={celebritySection.celebrities}
      itemHeight={288}
      buttonsStyle={{
        size: 35,
        top: 105
      }}
      gap={twoRemInPixels}
    >
      {(data) => <CelebrityCard />}
    </CardsReelSection>
  );
}

export default CelebritiesSection;
