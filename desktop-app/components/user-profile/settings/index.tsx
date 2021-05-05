import React from "react";
import { NotificationLangForm } from "../notification-lang-form";
import styles from "./styles.module.scss";
function SettingsUser() {
  return (
    <div className={styles.SettingsUserContainer}>
      <h5>Ajustes</h5>
      <NotificationLangForm />
    </div>
  );
}

export default SettingsUser;
