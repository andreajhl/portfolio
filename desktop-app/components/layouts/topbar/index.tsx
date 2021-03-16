import styles from "./styles.module.scss";
import classes from "classnames";
import Link from "next/link";
import {
  BellIcon,
  CartIcon,
  CurrencyIcon
} from "desktop-app/components/common/icon";

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

function FamososLogo() {
  return (
    <Link href="/">
      <a href="/" className={styles.FamososLogo}>
        <img
          className={styles.FamososLogoInactive}
          src="/assets/img/Famosos-logo-white.png"
          alt="Logo de Famosos"
        />
        <img
          className={styles.FamososLogoActive}
          src="/assets/img/Famosos-logo-white-hover.svg"
          alt="Logo de Famosos"
        />
      </a>
    </Link>
  );
}
