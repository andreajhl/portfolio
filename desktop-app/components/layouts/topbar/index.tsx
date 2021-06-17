import styles from "./styles.module.scss";
import {
  BellIcon,
  CartIcon,
  SearchIcon,
} from "desktop-app/components/common/icons";
import { FamososLogo } from "../../common/logo";
import { AccountDropdown } from "../account-dropdown";
import { CurrencyDropdown } from "../currency-dropdown";

function TopBar() {
  return (
    <header className={styles.TopBar}>
      <div className="container h-100">
        <div className="d-flex align-items-center h-100">
          <FamososLogo className={styles.TopBarLogo} />
          <div className="d-flex ml-auto">
            <div className={styles.TopBarSearch}>
              <input
                className={styles.TopBarSearchInput}
                type="text"
                name="TopBarSearchInput"
                id="TopBarSearchInput"
              />
              <SearchIcon className={styles.TopBarSearchIcon} />
            </div>
            <div
              className={`d-flex align-items-center ${styles.TopBarOptions}`}
            >
              <CurrencyDropdown />
              {/* <CartIcon /> */}
              {/* <BellIcon /> */}
            </div>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export { TopBar };
