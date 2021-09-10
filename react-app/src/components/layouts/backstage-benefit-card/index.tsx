import classes from "classnames";
import { SUBSCRIPTION_PLAN_PRICE } from "constants/celebritySubscriptionPlan";
import {
  getSubscriptionBenefitDetailsPath,
  getSubscriptionCheckoutPath,
} from "constants/paths";
import { VimeoIframe } from "desktop-app/components/common/widgets/vimeo-iframe";
import useGetCelebrity from "lib/hooks/useGetCelebrity";
import getFormattedDate from "lib/utils/getFormattedDate";
import { Card } from "react-app/src/components/common/cards";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { analytics } from "react-app/src/state/utils/gtm";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { FormattedMessage } from "react-intl";
import { SubscriptionHiddenContent } from "../../common/cards/subscription-post-card";
import { Countdown } from "../../common/helpers/countdown";
import { ProtectedRouteLink } from "../../common/routing/protected-route-link";
import { PriceLayout } from "../../price-layout";
import styles from "./styles.module.scss";

function preventEvent(event) {
  event?.preventDefault?.();
}

function VideoPoster({ mediaUrl }: { mediaUrl: string }) {
  return (
    <video
      onPlay={preventEvent}
      onContextMenu={preventEvent}
      muted
      controls={false}
      className={styles.PosterImage}
      src={mediaUrl}
      preload="metadata"
      width="368"
      height="368"
    />
  );
}

type BackstageBenefitCardProps = {
  className?: string;
  benefit: SubscriptionBenefitType;
  isSubscribed?: boolean;
  subscriptionPrice?: number;
};

function BackstageBenefitCard({
  className,
  benefit,
  isSubscribed,
  subscriptionPrice = SUBSCRIPTION_PLAN_PRICE,
}: BackstageBenefitCardProps) {
  const celebrity = useGetCelebrity()?.celebrity;
  const expirationDate = new Date(benefit?.expirationDate);
  const isExpired = Number(expirationDate) - Date.now() < 0;
  const date = getFormattedDate(expirationDate);

  const timeCounter = (
    <span className={styles.TimeCounter}>
      <Countdown finishDate={expirationDate} />
    </span>
  );

  const cardLink = isSubscribed
    ? getSubscriptionBenefitDetailsPath(benefit.id)
    : getSubscriptionCheckoutPath(celebrity?.username);

  function trackSubscribeClick() {
    analytics.track("CLICK_ON_CELEBRITY_BENEFIT_SUBSCRIBE_BUTTON", {
      celebrity,
      subscriptionPrice,
      benefit,
    });
  }

  return (
    <Card
      as={ProtectedRouteLink}
      href={cardLink}
      className={classes(styles.BackstageBenefitCard, className)}
    >
      <div className={styles.PosterWrapper}>
        {/* TODO: Add poster instead of video */}
        <Maybe
          it={Boolean(benefit?.vimeoId)}
          orElse={<VideoPoster mediaUrl={benefit?.media_url} />}
        >
          <VimeoIframe
            vimeoId={benefit?.vimeoId}
            showControls={false}
            allowKeyboardControls={false}
            className={styles.PosterImage}
          />
        </Maybe>
        <div
          className={classes(
            styles.PosterOverlay,
            isSubscribed && styles.DarkenBackground
          )}
        >
          <h3 className={styles.BenefitTitle}>{benefit.title}</h3>
        </div>
        <Maybe it={!isSubscribed}>
          <SubscriptionHiddenContent
            onClickSubscribe={trackSubscribeClick}
            description=""
            imageSrc=""
            price={<PriceLayout price={subscriptionPrice} showPrefix={false} />}
            fullName={celebrity?.fullName}
            username={celebrity?.username}
          />
        </Maybe>
      </div>
      <div className={styles.ContentWrapper}>
        <span className={styles.BenefitDateText}>
          <Maybe
            it={isExpired}
            orElse={
              <FormattedMessage
                defaultMessage="Faltan solo: {timeCounter}"
                values={{ timeCounter }}
              />
            }
          >
            <FormattedMessage
              defaultMessage="Este beneficio expiró el {date}"
              values={{ date }}
            />
          </Maybe>
        </span>
      </div>
    </Card>
  );
}

export { BackstageBenefitCard };
