import StarRatingDisplay from "desktop-app/components/common/star-rating/display";
import { FormattedMessage } from "lib/custom-intl";
import styles from "./styles.module.scss";
import { useState } from "react";

type timeFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
};

function FilterRatingNavbar({ isOpen, onToggle }: timeFilterProps) {
  const [starChecked, setStarChecked] = useState(4);

  const onChangeRating = (value) => {
    setStarChecked(value);
  };

  return (
    <div className={styles.option}>
      <span className={styles.optionTittle} onClick={() => onToggle()}>
        <FormattedMessage defaultMessage="Calificaciónes" />
      </span>
      {isOpen && (
        <div className={styles.ContainerOption}>
          <StarRatingDisplay
            value={starChecked}
            editing
            onChangeRating={onChangeRating}
            starSchemeColor={"pink"}
          />
        </div>
      )}
    </div>
  );
}

export { FilterRatingNavbar };
