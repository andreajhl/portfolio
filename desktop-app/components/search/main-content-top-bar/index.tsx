import { useEffect, useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect } from "react-redux";
import Badge from "../../common/badge";
import { HomeButton } from "../../common/button/home-button";
import { IconButton } from "../../common/button/icon-button";
import { SettingsIcon } from "../../common/icons";
import { OrderByDropdown } from "../order-by-dropdown";
import styles from "./styles.module.scss";

const orderByOptions = [
  { label: "Destacados", value: "" },
  { label: "Menor a mayor precio", value: "price asc" },
  { label: "Mayor a menor precio", value: "price desc" }
];

const getOptionByValue = (value) =>
  orderByOptions.find((option) => option.value === value);

const mapStateToProps = ({ searchFilters }) => ({
  filtersOrderBy: getOptionByValue(searchFilters.orderBy) || orderByOptions[0]
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
  updateSearchFilters
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
      {/* <Badge text="Actores" onClick={() => console.log("Clicked")} /> */}
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
