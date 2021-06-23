import { connect, ConnectedProps } from "react-redux";
import { ResultsCardGrid } from "../results-card-grid";
import { fetchSimilarResultsV2 } from "react-app/src/state/ducks/celebrities/actions";
import { useEffect } from "react";
import { RootState } from "react-app/src/state/store";
import styles from "./styles.module.scss";

const mapStateToProps = ({ searchFilters, celebrities }: RootState) => ({
  searchFilters,
  additionalCelebrities:
    celebrities.fetchCelebritiesSimilarResultsReducer.data.results,
  isLoading: !celebrities.fetchCelebritiesSimilarResultsReducer.completed,
});

const mapDispatchToProps = { fetchSimilarResults: fetchSimilarResultsV2 };

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type AdditionalResultsSectionProps = {
  sidebarIsClosed: boolean;
} & PropsFromRedux;

function AdditionalResultsSection({
  sidebarIsClosed,
  searchFilters,
  additionalCelebrities,
  isLoading,
  fetchSimilarResults,
}: AdditionalResultsSectionProps) {
  useEffect(() => {
    fetchSimilarResults(searchFilters);
  }, [searchFilters]);

  if (!isLoading && additionalCelebrities.length === 0) return null;

  return (
    <section className={styles.AdditionalResultsSection}>
      <h2 className={styles.AdditionalResultsSectionTitle}>
        Quizá también pueda interesarte
      </h2>
      <ResultsCardGrid
        isLoading={isLoading}
        expanded={sidebarIsClosed}
        celebrities={additionalCelebrities}
      />
    </section>
  );
}

const _AdditionalResultsSection = connector(AdditionalResultsSection);

export { _AdditionalResultsSection as AdditionalResultsSection };
