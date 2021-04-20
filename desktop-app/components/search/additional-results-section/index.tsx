import { connect } from "react-redux";
import { ResultsCardGrid } from "../results-card-grid";
import styles from "./styles.module.scss";
import getMoreFrequentIds from "react-app/src/utils/getMoreFrequentIds";
import { fetchSimilarResults } from "react-app/src/state/ducks/celebrities/actions";
import { useEffect, useMemo } from "react";

const mapStateToProps = ({ searchFilters, celebrities }) => {
  return {
    celebritiesResults: celebrities.fetchCelebritiesReducer.data.results,
    searchFilters,
    additionalCelebrities:
      celebrities.fetchCelebritiesSimilarResultsReducer.data.results
  };
};

const mapDispatchToProps = { fetchSimilarResults };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type AdditionalResultsSectionProps = { sidebarIsClosed: boolean } & StateProps &
  DispatchProps;

function AdditionalResultsSection({
  sidebarIsClosed,
  celebritiesResults,
  searchFilters,
  additionalCelebrities,
  fetchSimilarResults
}: AdditionalResultsSectionProps) {
  const additionalResultsParams = useMemo(() => {
    const canGetParamsFromResults = celebritiesResults.length > 0;
    return canGetParamsFromResults
      ? {
          ...searchFilters,
          country_id: getMoreFrequentIds(celebritiesResults, "countryId"),
          category_id: getMoreFrequentIds(celebritiesResults, "categoryId")
        }
      : searchFilters;
  }, [celebritiesResults, searchFilters]);

  useEffect(() => {
    if (!additionalResultsParams?.limit) return;
    fetchSimilarResults(additionalResultsParams);
  }, [additionalResultsParams]);

  return (
    <section className={styles.AdditionalResultsSection}>
      <h2 className={styles.AdditionalResultsSectionTitle}>
        Quizá también pueda interesarte
      </h2>
      <ResultsCardGrid
        expanded={sidebarIsClosed}
        celebrities={additionalCelebrities}
      />
    </section>
  );
}

const _AdditionalResultsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalResultsSection);

export { _AdditionalResultsSection as AdditionalResultsSection };
