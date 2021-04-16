import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect } from "react-redux";
import Pagination from "../../common/pagination";
import { ResultsCardGrid } from "../results-card-grid";
import styles from "./styles.module.scss";

const mapStateToProps = ({ searchFilters, celebrities }) => {
  return {
    informationPage: {
      pageSize: searchFilters.limit,
      totalPage:
        Math.ceil(
          celebrities.fetchCelebritiesReducer.data.totalResults /
            searchFilters.limit
        ) || 1,
      currentPage: searchFilters.offset / searchFilters.limit + 1
    }
  };
};

const mapDispatchToProps = {
  updateSearchFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchResultsProps = {
  sidebarIsOpen: boolean;
} & StateProps &
  DispatchProps;

function SearchResults({
  sidebarIsOpen,
  informationPage,
  updateSearchFilters
}: SearchResultsProps) {
  return (
    <main
      className={`container ${
        sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
      }`}
    >
      <ResultsCardGrid expanded={!sidebarIsOpen} />
      <div className={styles.PaginationContainer}>
        <Pagination
          onChangePage={(nextPage) => {
            updateSearchFilters({
              offset: (nextPage - 1) * informationPage.pageSize
            });
          }}
          totalPage={informationPage.totalPage}
          currentPage={informationPage.currentPage}
        />
      </div>
    </main>
  );
}

const _SearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);

export { _SearchResults as SearchResults };
