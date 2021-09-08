import { PageContainer } from "../../layouts/page-container";
import useGetSubscriptionBenefit from "lib/hooks/useGetSubscriptionBenefit";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import styles from "./styles.module.scss";
import { useIntl, FormattedMessage } from "lib/custom-intl";
import {
  getBenefitTypeMessage,
  getDescriptionLabelMessage,
  getLinkLabelMessage,
} from "lib/messages/suscription-benefits";
import classes from "classnames";
import Maybe from "../../common/helpers/maybe";
import getFormattedDate from "lib/utils/getFormattedDate";
import { Countdown } from "../../common/helpers/countdown";
import { VimeoIframe } from "desktop-app/components/common/widgets/vimeo-iframe";
import { VideoLayout } from "react-app/src/components/containers/celebrity-shared-post";
import { useState } from "react";

const noMediaBanner = (
  <div className={styles.NoMediaBanner}>
    <i className="fa fa-video-slash" />
    <p>
      <FormattedMessage defaultMessage="Sin video" />
    </p>
  </div>
);

type SubscriptionBenefitDetailsProps = {
  benefitId: string;
};

function SubscriptionBenefitDetails({
  benefitId,
}: SubscriptionBenefitDetailsProps) {
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const { benefit } = useGetSubscriptionBenefit(Number(benefitId));
  const { formatMessage } = useIntl();
  const expirationDate = new Date(benefit?.expirationDate);

  const date = getFormattedDate(expirationDate);
  const isExpired = Number(expirationDate) - Date.now() < 0;

  const descriptionLabel = formatMessage(
    getDescriptionLabelMessage(benefit?.benefit_type)
  );

  const translatedBenefitType = formatMessage(
    getBenefitTypeMessage(benefit?.benefit_type)
  );

  const linkLabel = formatMessage(getLinkLabelMessage(benefit?.benefit_type));
  const hasMedia = Boolean(benefit?.media_url || benefit?.vimeoId);

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
                  <Countdown finishDate={expirationDate} />
                </p>
              </div>
            </div>
          </Maybe>
          <div className={styles.MediaContainer}>
            <Maybe it={hasMedia} orElse={noMediaBanner}>
              <Maybe
                it={Boolean(benefit?.vimeoId)}
                orElse={
                  <VideoLayout
                    videoIsMuted={videoIsMuted}
                    setVideoIsMuted={setVideoIsMuted}
                    media={{ mediaUrl: benefit?.media_url }}
                    classNameSlideLayoutVideo={styles.MediaPlayer}
                    setSlideshowIsPlaying={() => {}}
                    autoPlayVideo
                  />
                }
              >
                <VimeoIframe
                  vimeoId={benefit?.vimeoId}
                  className={styles.MediaPlayer}
                  autoPlay
                />
              </Maybe>
            </Maybe>
          </div>
          <h4 className="description_s">{descriptionLabel}</h4>
          <p className="paragraf_3">{benefit?.description}</p>
          <h4 className="description_s">
            <FormattedMessage defaultMessage="Dinámica:" />
          </h4>
          <p>{benefit?.instructions}</p>
          <Maybe it={Boolean(benefit?.link)}>
            <a
              className={`description_s ${styles.BenefitLinkAnchor}`}
              rel="noreferrer"
              target="_blank"
              href={benefit?.link}
            >
              {linkLabel} <i className="fa fa-external-link-alt"></i>
            </a>
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}

export { SubscriptionBenefitDetails };
