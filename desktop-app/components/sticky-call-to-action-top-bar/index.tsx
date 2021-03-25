import { celebrityType } from "desktop-app/types/celebrityType";
import { CelebrityInfo } from "../celebrity-profile/celebrity-info";
import { PriceLayout } from "../common/helpers/price-layout";
import { StickyTopBar } from "../sticky-top-bar";
import styles from "./styles.module.scss";

type StickyCallToActionTopBarProps = {
  celebrity: celebrityType;
};

function StickyCallToActionTopBar({
  celebrity
}: StickyCallToActionTopBarProps) {
  return (
    <StickyTopBar>
      <div className={"container " + styles.StickyCTAContainer}>
        <img
          src={celebrity.avatar}
          alt={`Foto de ${celebrity.fullName}`}
          className={styles.StickyCTAAvatar}
        />
        <h2 className={"text-with-ellipsis " + styles.StickyCTAFullName}>
          {celebrity.fullName}
        </h2>
        <CelebrityInfo celebrity={celebrity} className={styles.StickyCTAInfo} />
        <span className={styles.StickyCTAPrice}>
          <PriceLayout price={125} decimalScale={0} />
        </span>
        <button
          type="button"
          className={"btn btn-primary " + styles.StickyCTAButton}
        >
          Comprar video personalizado
        </button>
      </div>
    </StickyTopBar>
  );
}

export { StickyCallToActionTopBar };
