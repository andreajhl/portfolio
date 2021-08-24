import classes from "classnames";
import { getSubscriptionBenefitDetailsPath } from "constants/paths";
import { Card } from "react-app/src/components/common/cards";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { Link } from "react-app/src/components/common/routing/link";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type BackstageBenefitCardProps = {
  className?: string;
  benefit: any;
};

function BackstageBenefitCard({
  className,
  benefit,
}: BackstageBenefitCardProps) {
  const isExpired = benefit.expireAt - Date.now() < 0;
  const date = "23/04/21";

  const timeCounter = <span className={styles.TimeCounter}>00:00:00</span>;

  return (
    <Card
      as={Link}
      href={getSubscriptionBenefitDetailsPath(benefit.id)}
      className={classes(styles.BackstageBenefitCard, className)}
    >
      <div className={styles.PosterWrapper}>
        <img
          className={styles.PosterImage}
          src={benefit.poster}
          alt={benefit.title}
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
