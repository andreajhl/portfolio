import { AdditionalResultsSection } from "desktop-app/components/search/additional-results-section";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useEffect } from "react";
import { searchList } from "react-app/src/state/ducks/celebrities/actions";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";

import { connect } from "react-redux";
import Pagination from "../../common/pagination";
import { NoResultsBanner } from "../no-results-banner";
import { SearchResultsCardGrid } from "../search-results-card-grid";
import styles from "./styles.module.scss";
import { cursorOperations } from "react-app/src/state/ducks/cursor-position";
import { updateSearchFiltersMemory } from "react-app/src/state/ducks/search-filters-memory/actions";

function checkIfObjectContains(one, two) {
  for (var i in one) {
    if (!two.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

const mapStateToProps = ({
  searchFiltersMemory,
  searchFilters,
  celebrities,
  cursor,
}) => {
  return {
    showNoResultsBanner:
      celebrities.fetchCelebritiesReducer.completed &&
      celebrities.fetchCelebritiesReducer.data.totalResults < 1,
    showAdditionalResults:
      celebrities.fetchCelebritiesReducer.completed &&
      celebrities.fetchCelebritiesReducer.data.totalResults < 5,
    searchFilters,
    searchFiltersMemory,
    informationPage: {
      pageSize: searchFilters.limit,
      totalPage:
        Math.ceil(
          celebrities.fetchCelebritiesReducer.data.totalResults /
            searchFilters.limit
        ) || 1,
      currentPage: searchFilters.offset / searchFilters.limit + 1,
    },
    lastScrollPosition: cursor.cursorReducer?.Position,
  };
};

const mapDispatchToProps = {
  updateSearchFilters,
  fetchCelebrities: searchList,
  saveCursorPosition: cursorOperations.saveCursorPosition,
  updateSearchFiltersMemory,
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
  searchFiltersMemory,
  showAdditionalResults,
  fetchCelebrities,
  updateSearchFilters,
  saveCursorPosition,
  updateSearchFiltersMemory,
  lastScrollPosition,
}: SearchResultsProps) {
  useEffect(() => {
    return () => {
      updateSearchFiltersMemory(searchFilters);
      saveCursorPosition(window.scrollY);
    };
  }, []);

  useEffect(() => {
    if (checkIfObjectContains(searchFilters, searchFiltersMemory)) {
      window.scrollTo(0, lastScrollPosition);
    } else {
      fetchCelebrities(searchFilters, false);
    }
  }, [searchFilters]);

  return (
    <main
      className={`container ${
        sidebarIsOpen ? styles.ContainerSidebarIsOpen : ""
      }`}
    >
      <Maybe
        it={showNoResultsBanner}
        orElse={<SearchResultsCardGrid expanded={!sidebarIsOpen} />}
      >
        <NoResultsBanner />
      </Maybe>
      <Maybe it={showAdditionalResults}>
        <AdditionalResultsSection sidebarIsClosed={!sidebarIsOpen} />
      </Maybe>
      <div className={styles.PaginationContainer}>
        <Pagination
          onChangePage={(nextPage) => {
            updateSearchFilters({
              offset: (nextPage - 1) * informationPage.pageSize,
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
