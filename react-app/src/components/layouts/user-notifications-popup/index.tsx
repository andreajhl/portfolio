import { BellIcon } from "desktop-app/components/common/icons";
import React from "react";
import { MobileAnimatedPopup } from "../../common/mobile-animated-popup";
import { UserNotification } from "../../containers/user-notification-item";
import styles from "./styles.module.scss";

const mockData = {
  date: "24/02/2021",
  description: "¡Tu video de Andrés Cepeda está listo!",
  action: "video_ready",
};

function UserNotificationsPopup() {
  return (
    <MobileAnimatedPopup
      trigger={
        <button className={`btn btn-outline ${styles.ButtonDropdown}`}>
          <BellIcon
            style={{
              color: "black",
            }}
          />
        </button>
      }
    >
      <div className={styles.NotificationList}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
          <UserNotification
            className={styles.NotificationItem}
            notification={mockData}
          />
        ))}
      </div>
    </MobileAnimatedPopup>
  );
}

export { UserNotificationsPopup };
