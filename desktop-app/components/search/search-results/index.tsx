import { AdditionalResultsSection } from "desktop-app/components/search/additional-results-section";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useEffect } from "react";
import { searchList } from "react-app/src/state/ducks/celebrities/actions";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect, ConnectedProps } from "react-redux";
import Pagination from "../../common/pagination";
import { NoResultsBanner } from "../no-results-banner";
import { SearchResultsCardGrid } from "../search-results-card-grid";
import { cursorOperations } from "react-app/src/state/ducks/cursor-position";
import { updateSearchFiltersMemory } from "react-app/src/state/ducks/search-filters-memory/actions";
import { RootState } from "react-app/src/state/store";
import classes from "classnames";
import styles from "./styles.module.scss";
import { checkIfObjectContainsSamePairKeyValue } from "react-app/src/utils/checkIfObjectContainsSamePairKeyValue";

function mapStateToProps({
  searchFiltersMemory,
  searchFilters,
  celebrities,
  cursor,
}: RootState) {
  const showNoResultsBanner =
    celebrities.fetchCelebritiesReducer.completed &&
    celebrities.fetchCelebritiesReducer.data?.informationPage?.totalItems < 1;

  const showAdditionalResults =
    celebrities.fetchCelebritiesReducer.completed &&
    celebrities.fetchCelebritiesReducer.data?.informationPage?.totalItems < 10;

  const showPagination =
    celebrities.fetchCelebritiesReducer.completed &&
    celebrities.fetchCelebritiesReducer.data?.informationPage?.totalPages > 1;

  return {
    showNoResultsBanner,
    showAdditionalResults,
    showPagination,
    searchFilters,
    searchFiltersMemory,
    informationPage: celebrities.fetchCelebritiesReducer.data.informationPage,
    lastScrollPosition: cursor.positionReducer.data,
  };
}

const mapDispatchToProps = {
  updateSearchFilters,
  fetchCelebrities: searchList,
  saveCursorPosition: cursorOperations.saveCursorPosition,
  updateSearchFiltersMemory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SearchResultsProps = {
  sidebarIsOpen: boolean;
} & PropsFromRedux;

function SearchResults({
  sidebarIsOpen,
  informationPage,
  searchFilters,
  showNoResultsBanner,
  searchFiltersMemory,
  showAdditionalResults,
  showPagination,
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
    if (
      checkIfObjectContainsSamePairKeyValue(searchFilters, searchFiltersMemory)
    ) {
      window.scrollTo(0, lastScrollPosition);
    } else {
      fetchCelebrities(searchFilters, false);
    }
  }, [searchFilters]);

  function updateSearchPage(nextPage: number): void {
    updateSearchFilters({
      currentPage: nextPage,
    });
  }

  return (
    <main
      className={classes(
        "container",
        styles.SearchResults,
        sidebarIsOpen && styles.ContainerSidebarIsOpen
      )}
    >
      <Maybe it={!showNoResultsBanner} orElse={<NoResultsBanner />}>
        <SearchResultsCardGrid expanded={!sidebarIsOpen} />
      </Maybe>
      <Maybe it={showPagination}>
        <div className={styles.PaginationContainer}>
          <Pagination
            onChangePage={updateSearchPage}
            totalPages={informationPage.totalPages}
            currentPage={informationPage.currentPage}
          />
        </div>
      </Maybe>
      <Maybe it={showAdditionalResults}>
        <AdditionalResultsSection sidebarIsClosed={!sidebarIsOpen} />
      </Maybe>
    </main>
  );
}

const _SearchResults = connector(SearchResults);

export { _SearchResults as SearchResults };
