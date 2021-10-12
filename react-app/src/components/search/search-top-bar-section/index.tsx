import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect, ConnectedProps } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { FormattedMessage } from "react-intl";
import Checkbox from "desktop-app/components/common/form/checkbox";
import { OffCanvasSearchFilters } from "../off-canvas-search-filters";
import useSearchFilters from "lib/hooks/useSearchFilters";

const getHashtagsArray = (hashtags: string) =>
  typeof hashtags === "string" && hashtags.length > 0
    ? hashtags.split(",")
    : [];

const FLASH_DELIVERY_TIME_VALUE = "flash";

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
    hashtags: getHashtagsArray(searchFilters.hashtags),
  };
}

const mapDispatchToProps = { updateSearchFilters };

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type SearchTopBarSectionProps = {
  className?: string;
} & PropsFromRedux;

function SearchTopBarSection({
  className,
  hasSearched,
  totalResults,
  updateSearchFilters,
}: SearchTopBarSectionProps) {
  const { searchFilters } = useSearchFilters();
  const flashDeliveryIsChecked =
    searchFilters.max_delivery_time === FLASH_DELIVERY_TIME_VALUE;

  function toggleFlashDeliveryCheckbox() {
    updateSearchFilters({
      max_delivery_time: flashDeliveryIsChecked
        ? ""
        : FLASH_DELIVERY_TIME_VALUE,
    });
  }

  return (
    <div className={classes(styles.SearchTopBarSection, className)}>
      <div className={styles.FlexOne}>
        <Maybe
          it={hasSearched}
          orElse={
            <h2 className={styles.SearchTopBarSectionTitle}>
              <FormattedMessage defaultMessage="Famosos destacados" />
            </h2>
          }
        >
          <span className={styles.SearchTopBarSectionTotalResults}>
            <FormattedMessage
              defaultMessage="{totalResults} resultados"
              values={{ totalResults }}
            />
          </span>
        </Maybe>
      </div>
      <div className={styles.FlexOne}>
        <Checkbox
          className={styles.SearchTopBarSectionCheckbox}
          alignLabel="left"
          label={
            (<FormattedMessage defaultMessage="Entrega Flash 24hrs" />) as any
          }
          name="flashDeliveryCheckbox"
          value="flash"
          checked={flashDeliveryIsChecked}
          onChange={toggleFlashDeliveryCheckbox}
        />
      </div>
      <div>
        <OffCanvasSearchFilters
          trigger={
            <button
              type="button"
              className={classes("btn", styles.SearchTopBarSectionFilterButton)}
            >
              <FormattedMessage defaultMessage="Filtrar" />
              <i className="fa fa-chevron-down ml-2" />
            </button>
          }
        />
      </div>
    </div>
  );
}

const _SearchTopBarSection = connector(SearchTopBarSection);

export { _SearchTopBarSection as SearchTopBarSection };
