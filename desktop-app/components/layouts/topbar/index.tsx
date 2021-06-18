import styles from "./styles.module.scss";
import { FamososLogo } from "../../common/logo";
import { AccountDropdown } from "../account-dropdown";
import { CurrencyDropdown } from "../currency-dropdown";
import { TopbarSearchInput } from "desktop-app/components/topbar/search-input";

function TopBar() {
  return (
    <header className={styles.TopBar}>
      <div className="container h-100">
        <div className="d-flex align-items-center h-100">
          <FamososLogo className={styles.TopBarLogo} />
          <div className="d-flex ml-auto">
            <TopbarSearchInput />
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
