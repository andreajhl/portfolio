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
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import { analytics } from "react-app/src/state/utils/gtm";

const messages = defineMessages({
  avatarAlt: {
    defaultMessage: "Foto de {celebrityFullName}",
  },
});

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
  const { formatMessage } = useIntl();
  const avatarImgAlt = formatMessage(messages.avatarAlt, {
    celebrityFullName: celebrity.fullName,
  });

  const analyticsData = {
    widget: "StickyCallToActionTopBar",
    path: getWindowPathname(),
    celebrity,
    appearancePosition,
  };

  function trackCTAButtonClick() {
    analytics.track(
      "CLICK_CELEBRITY_PROFILE_STICKY_TOPBAR_BUTTON",
      analyticsData
    );
  }

  function onClickCTAButton() {
    trackCTAButtonClick();
    onCTAButtonClick?.();
  }

  return (
    <StickyTopBar appearancePosition={appearancePosition}>
      <div
        className={classes(
          "container",
          styles.StickyCTAContainer,
          parentElementClass
        )}
      >
        <img
          src={celebrity.avatar}
          alt={avatarImgAlt}
          className={styles.StickyCTAAvatar}
        />
        <h2 className={styles.StickyCTAFullName}>
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
          className={classes("btn btn-primary", styles.StickyCTAButton)}
          onClick={onClickCTAButton}
        >
          <FormattedMessage defaultMessage="Comprar video personalizado" />
        </button>
      </div>
    </StickyTopBar>
  );
}

export { StickyCallToActionTopBar };
