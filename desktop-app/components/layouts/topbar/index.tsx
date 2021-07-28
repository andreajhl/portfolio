import styles from "./styles.module.scss";
import { FamososLogo } from "../../common/logo";
import { AccountDropdown } from "../account-dropdown";
import { CurrencyModal } from "../currency-modal";
import { TopbarSearchInput } from "desktop-app/components/topbar/search-input";
import LangDropdown from "../lang-dropdown";
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
              <CurrencyModal />
              <LangDropdown />
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
