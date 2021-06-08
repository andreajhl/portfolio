import classes from "classnames";
import occasions from "constants/occasions";
import { OccasionType } from "desktop-app/types/contractDataType";
import { Fragment } from "react";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

const FOR_ME = 1;

const occasionsOnlyToGiftContract = [
  "LOVE",
  "MAKE_SMILE",
  "HOPE",
  "ASK_FOR_FORGIVENESS",
];

const occasionIsAvailableForGift = (occasionKey: string) =>
  !occasionsOnlyToGiftContract.includes(occasionKey);

type OccasionTitleProps = {
  title: string;
};

function OccasionTitle({ title }: OccasionTitleProps) {
  return (
    <p>
      {title.split(" ").map((word) => (
        <Fragment key={word}>
          {word}
          <br />
        </Fragment>
      ))}
    </p>
  );
}

type OccasionDataType = {
  icon: string;
  title: string;
  messages: string[];
};

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
        ([occasionKey, { title }]: [OccasionType, OccasionDataType]) => {
          const canDisplayOccasion =
            contractType !== FOR_ME || occasionIsAvailableForGift(occasionKey);

          const onClickHandler = () => onClickOccasion(occasionKey);

          const occasionIsSelected = occasionKey === selectedOccasion;

          return (
            <Maybe it={canDisplayOccasion} key={occasionKey}>
              <div
                className={classes(
                  styles.OccasionsItem,
                  occasionIsSelected && styles.OccasionsSelected
                )}
                onClick={onClickHandler}
              >
                <img
                  className={classes(
                    styles.OccasionsItemIcon,
                    styles[`Occasions${occasionKey}`]
                  )}
                  src={`/assets/img/occasions/${occasionKey}.svg`}
                  alt={title}
                />
                <OccasionTitle title={title} />
              </div>
            </Maybe>
          );
        }
      )}
    </div>
  );
}

export { OccasionsGrid };
