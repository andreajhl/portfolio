import useListSubscriptionBenefits from "lib/hooks/useListSubscriptionBenefits";
import { Countdown } from "react-app/src/components/common/helpers/countdown";
import classes from "classnames";
import styles from "./styles.module.scss";
import { Link } from "react-app/src/components/common/routing/link";
import { getSubscriptionBenefitDetailsPath } from "constants/paths";
import { Collapse } from "react-bootstrap";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { FormattedMessage, useIntl } from "react-intl";
import { getSubscriptionNextBenefitBannerText } from "lib/messages/suscription-benefits";

function byExpirationDate(
  previousBenefit: SubscriptionBenefitType,
  nextBenefit: SubscriptionBenefitType
) {
  const previousDate = Number(new Date(previousBenefit?.expirationDate));
  const nextDate = Number(new Date(nextBenefit?.expirationDate));
  return previousDate - nextDate;
}

const nextActiveBenefit = ({
  expirationDate,
}: SubscriptionBenefitType): boolean =>
  Number(new Date(expirationDate)) - Date.now() > 0;

type SubscriptionNextBenefitBannerProps = {
  className?: string;
};

function SubscriptionNextBenefitBanner({
  className,
}: SubscriptionNextBenefitBannerProps) {
  const { formatMessage } = useIntl();
  const { benefits } = useListSubscriptionBenefits({ shouldFetch: false });
  const nextBenefit = [...benefits]
    ?.sort?.(byExpirationDate)
    ?.find?.(nextActiveBenefit);

  const countdown = nextBenefit ? (
    <Countdown finishDate={new Date(nextBenefit?.expirationDate)} />
  ) : null;

  const bannerTextMessage = getSubscriptionNextBenefitBannerText(
    nextBenefit?.benefit_type
  );

  const bannerText = formatMessage(bannerTextMessage, { countdown });

  return (
    <Collapse in={Boolean(nextBenefit)} unmountOnExit>
      <div>
        <div
          className={classes(styles.SubscriptionNextBenefitBanner, className)}
        >
          <div
            className={classes(
              "container",
              styles.SubscriptionNextBenefitBannerContainer
            )}
          >
            <p className={styles.SubscriptionNextBenefitBannerText}>
              {bannerText}
            </p>
            <Link
              href={getSubscriptionBenefitDetailsPath(nextBenefit?.id)}
              className={classes(
                "btn btn-primary",
                styles.SubscriptionNextBenefitBannerButton
              )}
            >
              <FormattedMessage defaultMessage="Participar" />
            </Link>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

export { SubscriptionNextBenefitBanner };
