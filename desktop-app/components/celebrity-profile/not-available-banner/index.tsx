import React from "react";
import { SubscriptionToAvailabilityNotification } from "react-app/src/components/layouts/subscription-to-availability-notification";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

interface NotAvailableBannerProps {
  celebrityName: string;
  celebrityId: number;
  celebrityUsername: string;
  className?: string;
}

function NotAvailableBanner({
  className,
  celebrityName,
  celebrityId,
  celebrityUsername,
}: NotAvailableBannerProps) {
  return (
    <div className={classes(styles.BoxStyles, className)}>
      <header className={styles.Title}>
        <h3>
          <FormattedMessage
            defaultMessage="Lo sentimos, {celebrityName} no está disponible en estos momentos"
            values={{ celebrityName }}
          />
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
