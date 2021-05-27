import { HashtagsBadgeList } from "desktop-app/components/search/hashtags-badge-list";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect } from "react-redux";
import { HomeButton } from "../../common/button/home-button";
import { IconButton } from "../../common/button/icon-button";
import { SettingsIcon } from "../../common/icons";
import { OrderByDropdown } from "../order-by-dropdown";
import styles from "./styles.module.scss";

const orderByOptions = [
  { label: "Destacados", value: "" },
  { label: "Menor a mayor precio", value: "price asc" },
  { label: "Mayor a menor precio", value: "price desc" },
];

const getOptionByValue = (value) =>
  orderByOptions.find((option) => option.value === value);

const listParamsInitialKeys = ["offset", "limit"];

const hasSearched = (listParams) => {
  const listParamsEntries = Object.entries(listParams);
  return listParamsEntries.some(
    ([key, value]) => !listParamsInitialKeys.includes(key) && Boolean(value)
  );
};

const getHashtagsArray = (hashtags: string) =>
  typeof hashtags === "string" && hashtags.length > 0
    ? hashtags.split(",")
    : [];

const mapStateToProps = ({ searchFilters, celebrities }) => ({
  filtersOrderBy: getOptionByValue(searchFilters.orderBy) || orderByOptions[0],
  hasSearched: hasSearched(searchFilters),
  totalResults: celebrities.fetchCelebritiesReducer.data.totalResults,
  hashtags: getHashtagsArray(searchFilters.hashtags),
});

const mapDispatchToProps = { updateSearchFilters };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MainContentTopBarProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
} & StateProps &
  DispatchProps;

function MainContentTopBar({
  sidebarIsOpen,
  toggleSidebar,
  filtersOrderBy,
  hasSearched,
  totalResults,
  hashtags,
  updateSearchFilters,
}: MainContentTopBarProps) {
  return (
    <div
      className={`container ${styles.MainContentTopBarContainer} ${
        sidebarIsOpen ? styles.MainContentTopBarSidebarIsOpen : ""
      }`}
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
        it={hasSearched}
        orElse={
          <h2 className={styles.MainContentTopBarTitle}>Famosos destacados</h2>
        }
      >
        <Maybe it={totalResults !== undefined}>
          <HashtagsBadgeList
            hashtags={hashtags}
            onChangeHashtags={(hashtags) =>
              updateSearchFilters({ hashtags: hashtags.join(",") })
            }
          />
          <span className={styles.MainContentTopBarTotalResults}>
            {totalResults} resultados
          </span>
        </Maybe>
      </Maybe>
      <OrderByDropdown
        className={styles.MainContentTopBarOrderByDropdown}
        onChange={(option) => {
          updateSearchFilters({ orderBy: option.value });
        }}
        selectedOption={filtersOrderBy}
        options={orderByOptions}
      />
    </div>
  );
}

const _MainContentTopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentTopBar);

export { _MainContentTopBar as MainContentTopBar };
