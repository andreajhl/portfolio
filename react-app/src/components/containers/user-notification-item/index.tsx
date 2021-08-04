import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
type UserNotificationProps = {
  className?: string;
  notification: {
    date: string;
    description: string;
    action: any;
  };
};

function UserNotification({
  className = "",
  notification,
}: UserNotificationProps) {
  return (
    <div className={`${styles.UserNotificationWrapper} ${className}`}>
      <span className={styles.NotificationDate}>{notification.date}</span>
      <div className={styles.NotificationDescription}>
        <span>{notification.description}</span>
        <button className={classes("btn btn-outline", styles.ButtonCTA)}>
          Ver Video
        </button>
      </div>
    </div>
  );
}

export { UserNotification };
