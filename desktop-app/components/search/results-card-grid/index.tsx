import { sections } from "constants/celebrities-sections";
import { getPixelsFromViewportWidth } from "lib/utils/getPixelsFromViewportWidth";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CelebrityCard } from "../../common/cards/celebrity";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ResultsCardGridProps = {
  expanded?: boolean;
} & StateProps &
  DispatchProps;

function ResultsCardGrid({ expanded = false }: ResultsCardGridProps) {
  const [celebrityCardHeight, setCelebrityCardHeight] = useState(
    getPixelsFromViewportWidth(expanded ? 16.83 : 18.3)
  );

  useEffect(() => {
    // Para asegurar que el valor se actualice al tener disponible el "window".
    setCelebrityCardHeight(getPixelsFromViewportWidth(expanded ? 18.3 : 16.83));
  }, [expanded]);

  return (
    <div
      className={`${styles.ResultsCardGrid} ${
        expanded ? styles.ResultsCardGridExpanded : ""
      }`}
    >
      {sections[0].celebrities.map((celebrity) => (
        <CelebrityCard
          thumbnailHeight={celebrityCardHeight}
          thumbnailWidth={"100%"}
          celebrity={celebrity}
        />
      ))}
    </div>
  );
}

const _ResultsCardGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsCardGrid);

export { _ResultsCardGrid as ResultsCardGrid };
