import classes from "classnames";
import occasions, { OccasionType } from "constants/occasions";
import { Fragment } from "react";
import { useIntl } from "react-intl";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

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
  const { locale } = useIntl();
  const currentLocaleOccasions = occasions[locale] || occasions.es;

  return (
    <div className={classes(styles.OccasionsGrid, className)}>
      {Object.entries(currentLocaleOccasions).map(
        ([occasionKey, { title, messages }]: [
          OccasionType,
          OccasionDataType
        ]) => {
          const canDisplayOccasion = Boolean(messages?.[contractType - 1]);
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
