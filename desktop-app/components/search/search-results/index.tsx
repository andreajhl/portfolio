import Maybe from "desktop-app/components/common/helpers/maybe";
import { useEffect } from "react";
import { list } from "react-app/src/state/ducks/celebrities/actions";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect } from "react-redux";
import Pagination from "../../common/pagination";
import { NoResultsBanner } from "../no-results-banner";
import { ResultsCardGrid } from "../results-card-grid";
import styles from "./styles.module.scss";

const mapStateToProps = ({ searchFilters, celebrities }) => {
  return {
    showNoResultsBanner:
      celebrities.fetchCelebritiesReducer.completed &&
      celebrities.fetchCelebritiesReducer.data.totalResults < 1,
    searchFilters,
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
  updateSearchFilters,
  fetchCelebrities: list
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SearchResultsProps = {
  sidebarIsOpen: boolean;
  fetchCelebrities: (params: any, mergeResults?: boolean) => void;
} & StateProps &
  Omit<DispatchProps, "fetchCelebrities">;

function SearchResults({
  sidebarIsOpen,
  informationPage,
  searchFilters,
  showNoResultsBanner,
  fetchCelebrities,
  updateSearchFilters
}: SearchResultsProps) {
  useEffect(() => {
    fetchCelebrities(searchFilters, false);
  }, [searchFilters]);

  return (
    <main
      className={`container ${
        sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
      }`}
    >
      <Maybe
        it={showNoResultsBanner}
        orElse={<ResultsCardGrid expanded={!sidebarIsOpen} />}
      >
        <NoResultsBanner />
      </Maybe>
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
