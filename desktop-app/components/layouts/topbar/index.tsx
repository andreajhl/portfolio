import styles from "./styles.module.scss";
import classes from "classnames";

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
      </div>
    </header>
  );
}

export { TopBar };

function FamososLogo() {
  return <img src="/assets/img/Famosos-logo-white.png" alt="Logo de Famosos" />;
}
