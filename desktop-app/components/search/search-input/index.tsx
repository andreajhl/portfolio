import { SearchIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";
function SearchInput() {
  return (
    <div className={styles.SearchInput}>
      <button className={styles.SearchIconButton}>
        <SearchIcon className={styles.SearchIcon} />
      </button>
      <input
        placeholder="Pibe Valderrama, Netflix, Músicos, México..."
        className={styles.InputElement}
      ></input>
      <button className={styles.DeleteIconButton}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export { SearchInput };
