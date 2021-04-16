import { useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { connect } from "react-redux";
import Badge from "../../common/badge";
import { HomeButton } from "../../common/button/home-button";
import { IconButton } from "../../common/button/icon-button";
import { SettingsIcon } from "../../common/icons";
import { OrderByDropdown } from "../order-by-dropdown";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MainContentTopBarProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
} & StateProps &
  DispatchProps;

const orderByOptions = [
  { label: "Destacados", value: "" },
  { label: "Menor a mayor precio", value: "price asc" },
  { label: "Mayor a menor precio", value: "price desc" }
];

function MainContentTopBar({
  sidebarIsOpen,
  toggleSidebar
}: MainContentTopBarProps) {
  const [orderBy, setOrderBy] = useState(orderByOptions[0]);

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
      <Badge text="Actores" onClick={() => console.log("Clicked")} />
      <OrderByDropdown
        className={styles.MainContentTopBarOrderByDropdown}
        onChange={setOrderBy}
        selectedOption={orderBy}
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
