import classes from "classnames";
import occasions from "constants/occasions";
import { OccasionType } from "desktop-app/types/contractDataType";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

const occasionsOnlyToGiftContract = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS",
];

type OccasionsGridProps = {
  contractType: number;
  selectedOccasion: OccasionType;
  className?: string;
  onClickOccasion: (occasionKey: OccasionType) => void;
};

function OccasionsGrid({
  contractType,
  selectedOccasion,
  className = "",
  onClickOccasion,
}: OccasionsGridProps) {
  return (
    <div className={classes(styles.OccasionsGrid, className)}>
      {Object.entries(occasions).map(
        ([occasionKey, { title }]: [
          OccasionType,
          {
            icon: string;
            title: string;
            messages: string[];
          }
        ]) => (
          <Maybe
            it={
              contractType !== 1 ||
              !occasionsOnlyToGiftContract.includes(occasionKey)
            }
            key={occasionKey}
          >
            <div
              className={classes(
                styles.OccasionsItem,
                occasionKey === selectedOccasion && styles.OccasionsSelected
              )}
              onClick={() => onClickOccasion(occasionKey)}
            >
              <img
                className={classes(
                  styles.OccasionsItemIcon,
                  styles[`Occasions${occasionKey}`]
                )}
                src={`/assets/img/occasions/${occasionKey}.svg`}
                alt={title}
              />
              <p>
                {title.split(" ").map((word) => (
                  <>
                    {word}
                    <br />
                  </>
                ))}
              </p>
            </div>
          </Maybe>
        )
      )}
    </div>
  );
}

export { OccasionsGrid };
