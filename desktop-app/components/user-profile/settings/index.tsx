import React from "react";
import { FormattedMessage } from "react-intl";
import { NotificationLangForm } from "../notification-lang-form";
import styles from "./styles.module.scss";
function SettingsUser() {
  return (
    <div className={styles.SettingsUserContainer}>
      <h5>
        <FormattedMessage defaultMessage="Ajustes" />
      </h5>
      <NotificationLangForm />
    </div>
  );
}

export default SettingsUser;
