import { CountryFlag } from "desktop-app/components/common/country-flag";
import { CelebrityResponseTime } from "desktop-app/components/common/celebrity-response-time";
import { LastReviewsModal } from "desktop-app/components/layouts/last-reviews-modal";
import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";

type CelebrityInfoProps = {
  celebrity: celebrityType;
  className?: string;
};

function CelebrityInfo({ celebrity, className = "" }: CelebrityInfoProps) {
  return (
    <div className={`${styles.CelebrityInfo} ${className}`}>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <CountryFlag
          alpha2Code={celebrity.alpha2Code}
          width={23}
          className={styles.CelebrityInfoFlag}
        />
        {celebrity.categoryTitle}
      </span>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <LastReviewsModal>
          {{
            triggerElement: (
              <span className={styles.CelebrityInfoReviews}>
                <i className="fa fa-star text-warning mr-2" />
                4.5
              </span>
            )
          }}
        </LastReviewsModal>
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
