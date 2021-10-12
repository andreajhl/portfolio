import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { analytics } from "react-app/src/state/utils/gtm";
import { getSearchKeywordPath } from "constants/paths";
import { categories } from "constants/categories.js";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

const buttonStyleBase = {
  size: 40,
  top: 70,
  opacity: 0.6,
  transform: "translateY(-50%)",
};

type filterCategoriesPorps = {
  itemWidth: number;
  itemHeight: number;
  buttonStyle?: typeof buttonStyleBase;
  gap: number;
};

export const CategorieFilterCarrousel = ({
  itemWidth,
  itemHeight,
  buttonStyle = buttonStyleBase,
  gap,
}: filterCategoriesPorps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue) return;
    analytics.track("HOME_SEARCH_BAR_SUBMIT", {
      searchKeyword: inputValue,
      widget: "SearchBarSection",
    });
    router.push(getSearchKeywordPath(inputValue));
  }, [inputValue, router]);

  return (
    <CardsReelSection
      itemData={categories}
      itemCount={categories?.length}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      buttonsStyle={buttonStyle}
      gap={gap}
    >
      {(e) => (
        <div
          onClick={() => setInputValue(e.keywords[0])}
          className={styles.SearchBarContainer_Img}
        >
          <img src={e.image} alt={e.tittle} />
        </div>
      )}
    </CardsReelSection>
  );
};
