import classes from "classnames";
import { getSubscriptionBenefitDetailsPath } from "constants/paths";
import getFormattedDate from "lib/utils/getFormattedDate";
import { Card } from "react-app/src/components/common/cards";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { Link } from "react-app/src/components/common/routing/link";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { FormattedMessage } from "react-intl";
import { Countdown } from "../../common/helpers/countdown";
import styles from "./styles.module.scss";

function preventEvent(event) {
  event?.preventDefault?.();
}

type BackstageBenefitCardProps = {
  className?: string;
  benefit: SubscriptionBenefitType;
};

function BackstageBenefitCard({
  className,
  benefit,
}: BackstageBenefitCardProps) {
  const expirationDate = new Date(benefit?.expirationDate);
  const isExpired = Number(expirationDate) - Date.now() < 0;
  const date = getFormattedDate(expirationDate);

  const timeCounter = (
    <span className={styles.TimeCounter}>
      <Countdown finishDate={expirationDate} />
    </span>
  );

  return (
    <Card
      as={Link}
      href={getSubscriptionBenefitDetailsPath(benefit.id)}
      className={classes(styles.BackstageBenefitCard, className)}
    >
      <div className={styles.PosterWrapper}>
        {/* TODO: Add poster instead of video */}
        <video
          onPlay={preventEvent}
          onContextMenu={preventEvent}
          muted
          controls={false}
          className={styles.PosterImage}
          src={benefit.media_url}
          preload="metadata"
          width="368"
          height="368"
        />
        <div className={styles.PosterOverlay}>
          <h3 className={styles.BenefitTitle}>{benefit.title}</h3>
        </div>
      </div>
      <div className={styles.ContentWrapper}>
        <span className={styles.BenefitDateText}>
          <Maybe
            it={isExpired}
            orElse={
              <FormattedMessage
                defaultMessage="Faltan solo: {timeCounter}"
                values={{ timeCounter }}
              />
            }
          >
            <FormattedMessage
              defaultMessage="Este beneficio expiró el {date}"
              values={{ date }}
            />
          </Maybe>
        </span>
      </div>
    </Card>
  );
}

export { BackstageBenefitCard };
