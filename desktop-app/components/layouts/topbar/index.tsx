import styles from "./styles.module.scss";
import classes from "classnames";
import {
  BellIcon,
  CartIcon,
  CurrencyIcon
} from "desktop-app/components/common/icon";
import { FamososLogo } from "../../common/logo";

function TopBar() {
  return (
    <header className={styles.TopBar}>
      <div className="container">
        <FamososLogo />
        <div className={styles.TopBarSearch}>
          <input
            className={styles.TopBarSearchInput}
            type="text"
            name="TopBarSearchInput"
            id="TopBarSearchInput"
          />
          <i className={classes("fa fa-search", styles.TopBarSearchIcon)} />
        </div>
        <div className="row m-0 p-0">
          <CurrencyIcon />
          <CartIcon />
          <BellIcon />
        </div>
      </div>
    </header>
  );
}

export { TopBar };
