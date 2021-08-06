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
import { defineMessages, FormattedMessage } from "react-intl";
import { useIntl } from "lib/custom-intl";
import { getOptionByValue, translateOptions } from "lib/utils/options-utils";

const messages = defineMessages({
  featuredOptionLabel: {
    defaultMessage: "Destacados",
  },
  priceAscOptionLabel: {
    defaultMessage: "Menor a mayor precio",
  },
  priceDescOptionLabel: {
    defaultMessage: "Mayor a menor precio",
  },
});

const orderByOptions = [
  { label: messages.featuredOptionLabel, value: "" },
  { label: messages.priceAscOptionLabel, value: "price asc" },
  { label: messages.priceDescOptionLabel, value: "price desc" },
];

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
    searchOrderBy: searchFilters.orderBy,
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
  searchOrderBy,
  hasFiltered,
  hasSearched,
  totalResults,
  hashtags,
  updateSearchFilters,
}: MainContentTopBarProps) {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  function updateHashtagFilter(hashtags: string[]) {
    updateSearchFilters({ hashtags: hashtags.join(",") });
  }

  function updateOrderByFilter(option: { value: any }) {
    updateSearchFilters({ orderBy: option.value });
  }

  const orderByOptionsTranslated = translateOptions(
    orderByOptions,
    formatMessage
  );

  const filtersOrderBy =
    getOptionByValue(orderByOptionsTranslated, searchOrderBy) ||
    orderByOptionsTranslated[0];

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
          <h2 className={styles.MainContentTopBarTitle}>
            <FormattedMessage defaultMessage="Famosos destacados" />
          </h2>
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
            <Maybe
              it={Boolean(query?.search)}
              orElse={
                <FormattedMessage
                  defaultMessage="{totalResults} resultados"
                  values={{ totalResults }}
                />
              }
            >
              <FormattedMessage
                defaultMessage={`{totalResults} resultados para "{search}"`}
                values={{
                  totalResults,
                  search: query.search,
                }}
              />
            </Maybe>
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
        options={orderByOptionsTranslated}
      />
    </div>
  );
}

const _MainContentTopBar = connector(MainContentTopBar);

export { _MainContentTopBar as MainContentTopBar };
