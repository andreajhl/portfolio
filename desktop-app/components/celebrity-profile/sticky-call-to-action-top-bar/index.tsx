import { celebrityType } from "desktop-app/types/celebrityType";
import { CelebrityInfo } from "../celebrity-info";
import { StickyTopBar } from "../../common/sticky-top-bar";
import styles from "./styles.module.scss";
import { CelebrityVideoContractPrice } from "desktop-app/components/common/helpers/celebrity-video-contract-price";
import {
  TextWithOverflow,
  parentElementClass,
} from "desktop-app/components/common/text-with-overflow";
import classes from "classnames";

type StickyCallToActionTopBarProps = {
  celebrity: celebrityType;
  appearancePosition?: number;
  onCTAButtonClick?: () => void;
};

function StickyCallToActionTopBar({
  celebrity,
  appearancePosition,
  onCTAButtonClick = function () {},
}: StickyCallToActionTopBarProps) {
  return (
    <StickyTopBar appearancePosition={appearancePosition}>
      <div className={"container " + styles.StickyCTAContainer}>
        <img
          src={celebrity.avatar}
          alt={`Foto de ${celebrity.fullName}`}
          className={styles.StickyCTAAvatar}
        />
        <h2 className={classes(styles.StickyCTAFullName, parentElementClass)}>
          <TextWithOverflow
            textClassName={styles.CelebrityFullName}
            text={celebrity.fullName}
          />
        </h2>
        <CelebrityInfo celebrity={celebrity} className={styles.StickyCTAInfo} />
        <span className={styles.StickyCTAPrice}>
          <CelebrityVideoContractPrice celebrity={celebrity} />
        </span>
        <button
          type="button"
          className={"btn btn-primary " + styles.StickyCTAButton}
          onClick={onCTAButtonClick}
        >
          Comprar video personalizado
        </button>
      </div>
    </StickyTopBar>
  );
}

export { StickyCallToActionTopBar };
