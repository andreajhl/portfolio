import { PageContainer } from "../../layouts/page-container";
import useGetSubscriptionBenefit from "lib/hooks/useGetSubscriptionBenefit";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import styles from "./styles.module.scss";
import useCountdownUntilDate from "lib/hooks/useCountdownUntilDate";
import { useIntl, FormattedMessage } from "lib/custom-intl";
import {
  getBenefitTypeMessage,
  getDescriptionLabelMessage,
} from "lib/messages/suscription-benefits";
import classes from "classnames";
import Maybe from "../../common/helpers/maybe";
import getFormattedDate from "lib/utils/getFormattedDate";

type SubscriptionBenefitDetailsProps = {
  benefitId: string;
};

function SubscriptionBenefitDetails({
  benefitId,
}: SubscriptionBenefitDetailsProps) {
  const { benefit } = useGetSubscriptionBenefit(Number(benefitId));
  const { formatMessage } = useIntl();
  const expirationDate = new Date(benefit?.expirationDate);
  const { hours, minutes, seconds } = useCountdownUntilDate(
    expirationDate,
    true
  );

  const date = getFormattedDate(expirationDate);
  const isExpired = Number(expirationDate) - Date.now() < 0;

  const descriptionLabel = formatMessage(
    getDescriptionLabelMessage(benefit?.benefit_type)
  );

  const translatedBenefitType = formatMessage(
    getBenefitTypeMessage(benefit?.benefit_type)
  );

  return (
    <PageContainer showSearch={false} showNavbar={false}>
      <PageHeading>
        <span className={styles.BenefitType}>{translatedBenefitType}</span>
      </PageHeading>
      <div className={styles.SubscriptionBenefitDetails}>
        <div className={classes("container", styles.Container)}>
          <h1 className={styles.BenefitTitle}>{benefit?.title}</h1>
          <Maybe
            it={!isExpired}
            orElse={
              <p className={styles.ExpirationDate}>
                <FormattedMessage
                  defaultMessage="Este beneficio expiró el {date}"
                  values={{ date }}
                />
              </p>
            }
          >
            <div className={styles.Flex}>
              <div className="item-flex">
                <p className="paragraf_1">
                  <FormattedMessage defaultMessage="Faltan solo:" />
                </p>
              </div>
              <div className="item-flex2">
                <p className="paragraf_2">
                  {hours}:{minutes}:{seconds}
                </p>
              </div>
            </div>
          </Maybe>
          <div className={styles.MediaContainer}>
            <img
              src={benefit?.media_url}
              alt="Poster"
              width="300"
              height="300"
              className="photo-author"
            />
          </div>
          <h4 className="description_s">{descriptionLabel}</h4>
          <p className="paragraf_3">{benefit?.description}</p>
          <h4 className="description_s">
            <FormattedMessage defaultMessage="Dinámica:" />
          </h4>
          <p>{benefit?.instructions}</p>
        </div>
      </div>
    </PageContainer>
  );
}

export { SubscriptionBenefitDetails };
