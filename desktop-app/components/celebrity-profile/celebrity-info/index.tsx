import { CountryFlag } from "desktop-app/components/common/country-flag";
import { CelebrityResponseTime } from "desktop-app/components/common/celebrity-response-time";
import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchCategoryPath } from "constants/paths";
import { CelebrityInfoReviews } from "desktop-app/components/celebrity-profile/celebrity-info-reviews";

type CelebrityInfoProps = {
  celebrity: celebrityType;
  className?: string;
};

function CelebrityInfo({ celebrity, className = "" }: CelebrityInfoProps) {
  return (
    <div className={`${styles.CelebrityInfo} ${className}`}>
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
          {celebrity.categoryTitle}
        </Link>
      </span>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <CelebrityInfoReviews celebrityStarsAverage={celebrity.starsAverage} />
      </span>
      <span className={styles.CelebrityInfoItem}>
        Respuesta promedio:{" "}
        <CelebrityResponseTime
          availableForFlashDeliveries={celebrity.availableForFlashDeliveries}
          turnAroundTime={celebrity.turnaround}
        />
      </span>
    </div>
  );
}

export { CelebrityInfo };
