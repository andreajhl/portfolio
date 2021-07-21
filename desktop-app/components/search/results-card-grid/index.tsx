import { celebrityType } from "desktop-app/types/celebrityType";
import { getPixelsFromViewportWidth } from "lib/utils/getPixelsFromViewportWidth";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { CelebrityCard } from "../../common/cards/celebrity";
import { ResultsCardGridSkeleton } from "./skeleton";
import classes from "classnames";
import styles from "./styles.module.scss";
import { analytics } from "react-app/src/state/utils/gtm";
import { getWindowPathname } from "react-app/src/utils/getWindow";

type ResultsCardGridProps = {
  expanded?: boolean;
  isLoading?: boolean;
  celebrities: celebrityType[];
};

function ResultsCardGrid({
  expanded = false,
  isLoading = false,
  celebrities,
}: ResultsCardGridProps) {
  const [celebrityCardHeight, setCelebrityCardHeight] = useState(
    getPixelsFromViewportWidth(expanded ? 19 : 17.5, expanded ? 256 : 230)
  );

  useEffect(() => {
    function updateHeight() {
      setCelebrityCardHeight(
        getPixelsFromViewportWidth(expanded ? 19 : 17.5, expanded ? 256 : 230)
      );
    }

    updateHeight();
    const debouncedUpdateHeight = debounce(updateHeight, 500);

    window.addEventListener("resize", debouncedUpdateHeight);

    return () => {
      window.removeEventListener("resize", debouncedUpdateHeight);
    };
  }, [expanded]);

  function trackCelebrityCardClick(celebrity) {
    analytics.track("CLICK_ON_CELEBRITY_CARD", {
      ...celebrity,
      path: getWindowPathname(),
    });
  }

  return (
    <div
      className={classes(
        styles.ResultsCardGrid,
        expanded && styles.ResultsCardGridExpanded
      )}
    >
      <Maybe
        it={!isLoading && celebrities?.map !== undefined}
        orElse={
          <ResultsCardGridSkeleton
            thumbnailHeight={celebrityCardHeight}
            thumbnailWidth="100%"
          />
        }
      >
        {celebrities?.map?.((celebrity) => (
          <CelebrityCard
            onClickLink={() => trackCelebrityCardClick(celebrity)}
            key={celebrity.id}
            thumbnailHeight={celebrityCardHeight}
            thumbnailWidth="100%"
            celebrity={celebrity}
          />
        ))}
      </Maybe>
    </div>
  );
}

export { ResultsCardGrid };
