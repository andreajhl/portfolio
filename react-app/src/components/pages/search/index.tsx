import PageContainer from "desktop-app/components/layouts/page-container";
import { SearchResults } from "desktop-app/components/search/search-results";
import styles from "./styles.module.scss";
import { HashtagsFilter } from "desktop-app/components/search/hashtags-filter";
import useSearchFilters from "lib/hooks/useSearchFilters";
import { HashtagsBadgeList } from "desktop-app/components/search/hashtags-badge-list";
import { SearchTopBarSection } from "../../search/search-top-bar-section";

const getHashtagsArray = (hashtags: string) =>
  typeof hashtags === "string" && hashtags.length > 0
    ? hashtags.split(",")
    : [];

function SearchPage() {
  const { searchFilters, updateSearchFilters } = useSearchFilters();

  function updateSearchFilterHashtags(hashtags: string[]): void {
    updateSearchFilters({
      hashtags: hashtags.join(","),
    });
  }

  return (
    <PageContainer showFiltersSection={false}>
      <div className={styles.SearchTopBarSectionWrapper}>
        <div className="container">
          <SearchTopBarSection />
        </div>
      </div>
      <div className={styles.SearchPageHashtagsContainer}>
        <HashtagsBadgeList
          className={styles.SearchPageHashtagsBadgeList}
          hashtags={getHashtagsArray(searchFilters.hashtags)}
          onChangeHashtags={updateSearchFilterHashtags}
        />
        <HashtagsFilter
          onChangeHashtags={updateSearchFilterHashtags}
          className={styles.SearchPageHashtagsFilter}
          searchFilters={searchFilters}
        />
      </div>
      <SearchResults sidebarIsOpen={false} />
    </PageContainer>
  );
}

export { SearchPage };
