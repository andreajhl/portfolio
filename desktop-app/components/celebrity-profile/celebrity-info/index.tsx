import { CountryFlag } from "desktop-app/components/common/country-flag";
import { CelebrityResponseTime } from "desktop-app/components/common/celebrity-response-time";
import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchCategoryPath } from "constants/paths";
import { CelebrityInfoReviews } from "desktop-app/components/celebrity-profile/celebrity-info-reviews";
import classes from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import getTranslatedCategoryTitle from "lib/utils/getTranslatedCategoryTitle";

type CelebrityInfoProps = {
  celebrity: celebrityType;
  className?: string;
};

function CelebrityInfo({ celebrity, className = "" }: CelebrityInfoProps) {
  const { formatMessage } = useIntl();
  const categoryTitle = getTranslatedCategoryTitle(
    celebrity?.categoryTitle,
    formatMessage
  );

  return (
    <div className={classes(styles.CelebrityInfo, className)}>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <CountryFlag
          countryId={celebrity.countryId}
          alpha2Code={celebrity.alpha2Code}
          width={23}
          className={styles.CelebrityInfoFlag}
        />
        <Link
          href={getSearchCategoryPath(celebrity.categoryId)}
          className={styles.CelebrityInfoCategory}
        >
          {categoryTitle}
        </Link>
      </span>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <CelebrityInfoReviews celebrityStarsAverage={celebrity.starsAverage} />
      </span>
      <span
        className={classes(
          styles.CelebrityInfoItem,
          styles.DeliveryTimeWrapper
        )}
      >
        <span className={styles.DeliveryTimeLabel}>
          <FormattedMessage defaultMessage="Respuesta promedio:" />
        </span>
        <CelebrityResponseTime
          availableForFlashDeliveries={celebrity.availableForFlashDeliveries}
          turnAroundTime={celebrity.turnaround}
        />
      </span>
    </div>
  );
}

export { CelebrityInfo };
