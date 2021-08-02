/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdditionalResultsSection } from "desktop-app/components/search/additional-results-section";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useEffect, useState } from "react";
import { searchList } from "react-app/src/state/ducks/celebrities/actions";
import {
  updateSearchFilters,
  resetSearchFilters,
} from "react-app/src/state/ducks/search-filters/actions";
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
import { analytics } from "react-app/src/state/utils/gtm";
function noop() {}

function mapStateToProps({
  searchFiltersMemory,
  searchFilters,
  celebrities,
  cursor,
}: RootState) {
  const showNoResultsBanner =
    celebrities.fetchCelebritiesReducer.completed &&
    celebrities.fetchCelebritiesReducer.data?.informationPage?.totalItems < 1;

  const showPagination =
    celebrities.fetchCelebritiesReducer.completed &&
    celebrities.fetchCelebritiesReducer.data?.informationPage?.totalPages > 1;

  return {
    showNoResultsBanner,
    showPagination,
    searchFilters,
    searchFiltersMemory,
    isCompleted: celebrities.fetchCelebritiesReducer.completed,
    informationPage: celebrities.fetchCelebritiesReducer.data.informationPage,
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    lastScrollPosition: cursor.positionReducer.data,
  };
}

const mapDispatchToProps = {
  updateSearchFilters,
  fetchCelebrities: searchList,
  saveCursorPosition: cursorOperations.saveCursorPosition,
  updateSearchFiltersMemory,
  resetSearchFilters,
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
  showPagination,
  fetchCelebrities,
  updateSearchFilters,
  saveCursorPosition,
  updateSearchFiltersMemory,
  lastScrollPosition,
  resetSearchFilters,
  isCompleted,
  isLoading,
}: SearchResultsProps) {
  const [showAdditionalResults, setShowAdditionalResults] = useState(false);
  useEffect(() => {
    if (!isCompleted) return;
    if (
      checkIfObjectContainsSamePairKeyValue(
        searchFilters,
        searchFiltersMemory,
        false
      )
    ) {
      window.scrollTo(0, lastScrollPosition);
    }
    return () => {
      updateSearchFiltersMemory(searchFilters);
      saveCursorPosition(window.scrollY);
    };
  }, [isCompleted]);

  useEffect(() => {
    analytics.track("FETCH_CELEBRITIES_FROM_SEARCH", {
      searchFilters,
      widget: "SearchResults",
    });
    fetchCelebrities(searchFilters, false, true);
  }, [searchFilters]);

  useEffect(() => {
    const isCompletedAndInformationPageHasItems =
      isCompleted && informationPage?.totalItems > 0;
    if (isCompletedAndInformationPageHasItems && !isLoading) {
      setShowAdditionalResults(true);
    } else {
      setShowAdditionalResults(false);
    }
  }, [isCompleted, isLoading, informationPage?.totalItems]);

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
