import styles from "./styles.module.scss";
import {
  BellIcon,
  CartIcon,
  CurrencyIcon
} from "desktop-app/components/common/icon";
import { FamososLogo } from "../../common/logo";
import { AccountDropdown } from "../account-dropdown";

function TopBar() {
  return (
    <header className={styles.TopBar}>
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <FamososLogo className={styles.TopBarLogo} />
          <div className="row ml-auto">
            <div className={styles.TopBarSearch}>
              <input
                className={styles.TopBarSearchInput}
                type="text"
                name="TopBarSearchInput"
                id="TopBarSearchInput"
              />
              <i className={`fa fa-search ${styles.TopBarSearchIcon}`} />
            </div>
            <div
              className={`row m-0 p-0 align-items-center ${styles.TopBarOptions}`}
            >
              <CurrencyIcon />
              <CartIcon />
              <BellIcon />
            </div>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export { TopBar };
