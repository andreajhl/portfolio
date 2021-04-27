import React from "react";
import NotificationSlangForm from "../notification-slang-form";
import styles from "./styles.module.scss";
function SettingsUser() {
  return (
    <div className={styles.SettingsUserContainer}>
      <h5>Ajustes</h5>
      <NotificationSlangForm />
    </div>
  );
}

export default SettingsUser;
