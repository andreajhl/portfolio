import { SearchIcon } from "desktop-app/components/common/icons";
import React from "react";
import { defineMessages, useIntl } from "react-intl";
import styles from "./styles.module.scss";

const messages = defineMessages({
  placeholder: {
    defaultMessage: "Pibe Valderrama, Netflix, Músicos, México...",
  },
});
function SearchInput() {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.SearchInput}>
      <button className={styles.SearchIconButton}>
        <SearchIcon className={styles.SearchIcon} />
      </button>
      <input
        placeholder={formatMessage(messages.placeholder)}
        className={styles.InputElement}
      ></input>
      <button className={styles.DeleteIconButton}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}

export { SearchInput };
