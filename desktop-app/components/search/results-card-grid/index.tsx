import { celebrityType } from "desktop-app/types/celebrityType";
import { getPixelsFromViewportWidth } from "lib/utils/getPixelsFromViewportWidth";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { CelebrityCard } from "../../common/cards/celebrity";
import styles from "./styles.module.scss";

type ResultsCardGridProps = {
  expanded?: boolean;
  isLoading?: boolean;
  celebrities: celebrityType[];
};

function ResultsCardGrid({
  expanded = false,
  isLoading = false,
  celebrities
}: ResultsCardGridProps) {
  const [celebrityCardHeight, setCelebrityCardHeight] = useState(
    getPixelsFromViewportWidth(expanded ? 16.83 : 18.3, expanded ? 248 : 318)
  );

  useEffect(() => {
    function updateHeight() {
      setCelebrityCardHeight(
        getPixelsFromViewportWidth(
          expanded ? 18.3 : 16.83,
          expanded ? 248 : 318
        )
      );
    }

    updateHeight();
    const debouncedUpdateHeight = debounce(updateHeight, 500);

    window.addEventListener("resize", debouncedUpdateHeight);

    return () => {
      window.removeEventListener("resize", debouncedUpdateHeight);
    };
  }, [expanded]);

  return (
    <div
      className={`${styles.ResultsCardGrid} ${
        expanded ? styles.ResultsCardGridExpanded : ""
      }`}
    >
      <Maybe it={!isLoading && celebrities?.map !== undefined}>
        {celebrities?.map?.((celebrity) => (
          <CelebrityCard
            key={celebrity.id}
            thumbnailHeight={celebrityCardHeight}
            thumbnailWidth={"100%"}
            celebrity={celebrity}
          />
        ))}
      </Maybe>
    </div>
  );
}

export { ResultsCardGrid };
