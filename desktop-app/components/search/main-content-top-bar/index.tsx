import { HashtagsBadgeList } from "desktop-app/components/search/hashtags-badge-list";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect, ConnectedProps } from "react-redux";
import { HomeButton } from "../../common/button/home-button";
import { IconButton } from "../../common/button/icon-button";
import { SettingsIcon } from "../../common/icons";
import { OrderByDropdown } from "../order-by-dropdown";
import classes from "classnames";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useRouter } from "next/router";

const orderByOptions = [
  { label: "Destacados", value: "" },
  { label: "Menor a mayor precio", value: "price asc" },
  { label: "Mayor a menor precio", value: "price desc" },
];

const getOptionByValue = (value: string) =>
  orderByOptions.find((option) => option.value === value) || orderByOptions[0];

const listParamsInitialKeys = ["pageSize", "currentPage"];

function hasFiltered(listParams) {
  const listParamsEntries = Object.entries(listParams);
  return listParamsEntries.some(
    ([key, value]) => !listParamsInitialKeys.includes(key) && Boolean(value)
  );
}

const getHashtagsArray = (hashtags: string) =>
  typeof hashtags === "string" && hashtags.length > 0
    ? hashtags.split(",")
    : [];

function mapStateToProps({
  searchFilters,
  celebrities: { fetchCelebritiesReducer },
}) {
  const totalResults =
    fetchCelebritiesReducer.data?.informationPage?.totalItems;
  return {
    totalResults,
    hasSearched: totalResults !== undefined,
    filtersOrderBy: getOptionByValue(searchFilters.orderBy),
    hasFiltered: hasFiltered(searchFilters),
    hashtags: getHashtagsArray(searchFilters.hashtags),
  };
}

const mapDispatchToProps = { updateSearchFilters };

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type MainContentTopBarProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
} & PropsFromRedux;

function MainContentTopBar({
  sidebarIsOpen,
  toggleSidebar,
  filtersOrderBy,
  hasFiltered,
  hasSearched,
  totalResults,
  hashtags,
  updateSearchFilters,
}: MainContentTopBarProps) {
  const { query } = useRouter();
  function updateHashtagFilter(hashtags: string[]) {
    updateSearchFilters({ hashtags: hashtags.join(",") });
  }

  function updateOrderByFilter(option: { value: any }) {
    updateSearchFilters({ orderBy: option.value });
  }

  return (
    <div
      className={classes(
        "container",
        styles.MainContentTopBarContainer,
        sidebarIsOpen && styles.MainContentTopBarSidebarIsOpen
      )}
    >
      <Maybe it={!sidebarIsOpen}>
        <IconButton
          className={styles.MainContentTopBarSidebarToggler}
          onClick={toggleSidebar}
        >
          <SettingsIcon />
        </IconButton>
        <HomeButton />
      </Maybe>
      <Maybe
        it={hasFiltered}
        orElse={
          <h2 className={styles.MainContentTopBarTitle}>Famosos destacados</h2>
        }
      >
        <Maybe it={hasSearched}>
          <HashtagsBadgeList
            className={styles.Shrink}
            hashtags={hashtags}
            onChangeHashtags={updateHashtagFilter}
          />
          <span
            className={classes(
              styles.MainContentTopBarTotalResults,
              styles.DoNotShrink
            )}
          >
            {totalResults} resultados
            {query.search ? ` para "${String(query.search)}"` : null}
          </span>
        </Maybe>
      </Maybe>
      <OrderByDropdown
        className={classes(
          styles.MainContentTopBarOrderByDropdown,
          styles.DoNotShrink
        )}
        onChange={updateOrderByFilter}
        selectedOption={filtersOrderBy}
        options={orderByOptions}
      />
    </div>
  );
}

const _MainContentTopBar = connector(MainContentTopBar);

export { _MainContentTopBar as MainContentTopBar };
