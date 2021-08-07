import { connect } from "react-redux";
import { ResultsCardGrid } from "../results-card-grid";

const mapStateToProps = ({ celebrities }) => ({
  isLoading: celebrities.fetchCelebritiesReducer.loading,
  celebrities: celebrities.fetchCelebritiesReducer.data.results,
});

const _SearchResultsCardGrid = connect(mapStateToProps)(ResultsCardGrid);

export { _SearchResultsCardGrid as SearchResultsCardGrid };
