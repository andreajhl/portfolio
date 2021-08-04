import React from "react";
import { SubscriptionToAvailabilityNotification } from "react-app/src/components/layouts/subscription-to-availability-notification";
import styles from "./styles.module.scss";

interface NotAvailableBannerProps {
  celebrityName: string;
  celebrityId: number;
  celebrityUsername: string;
}

function NotAvailableBanner({
  celebrityName,
  celebrityId,
  celebrityUsername,
}: NotAvailableBannerProps) {
  return (
    <div className={styles.BoxStyles}>
      <header className={styles.Title}>
        <h3>
          Lo sentimos {celebrityName} no está disponible en estos momentos
        </h3>
      </header>
      <SubscriptionToAvailabilityNotification
        celebrityFullName={celebrityName}
        showCelebrityName={false}
        celebrityId={celebrityId}
        width="100%"
        celebrityUsername={celebrityUsername}
        fontSize="1rem"
      />
    </div>
  );
}

export { NotAvailableBanner };
