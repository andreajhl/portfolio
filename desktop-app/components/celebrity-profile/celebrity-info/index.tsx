import { CelebrityFlag } from "desktop-app/components/common/celebrity-flag";
import { CelebrityResponseTime } from "desktop-app/components/common/celebrity-response-time";
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
        <CelebrityFlag
          alpha2Code={celebrity.alpha2Code}
          width={23}
          className={styles.CelebrityInfoFlag}
        />
        {celebrity.categoryTitle}
      </span>
      <span className={styles.CelebrityInfoItemWithSeparator}>
        <i className="fa fa-star text-warning mr-2"></i>
        4.5
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
