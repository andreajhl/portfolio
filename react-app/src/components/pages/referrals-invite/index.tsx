import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import Maybe from "../../common/helpers/maybe";
import {
  getMailShareLink,
  getWhatsappSharingLink,
} from "lib/utils/getSocialMediaLink";
import { useIntl } from "react-intl";
import { ReferralsInviteSlideshow } from "../../referrals-invite/referrals-invite-slideshow";
import { CopyLinkContainer } from "react-app/src/components/common/widgets/copy-link-container";
import useReferralLink from "../../../../../lib/hooks/useReferralLink";
import referralsMessages from "lib/messages/referrals";

function ReferralsInvitePage() {
  const { formatMessage } = useIntl();
  const { referralLink, isReady: referralLinkIsReady } = useReferralLink();

  const shareEmailSubject = formatMessage(referralsMessages.shareMailSubject);
  const shareMessage = formatMessage(referralsMessages.shareMessage, {
    referralLink,
  });

  return (
    <PageContainer showSearch={false}>
      <main className={styles.ReferralsInvitePage}>
        <div
          className={classes("container", styles.ReferralsInvitePageContainer)}
        >
          <h1 className={styles.Title}>
            <FormattedMessage defaultMessage="Los amigos que se mantienen juntos, ahorran juntos." />
          </h1>
          <div className={styles.SlideshowCard}>
            <ReferralsInviteSlideshow className={styles.Slideshow} />
          </div>
          <section className={styles.ShareLinkSection}>
            <h2 className={styles.ShareLinkTitle}>
              <FormattedMessage defaultMessage="¡Comparte tu Link!" />
            </h2>
            <CopyLinkContainer
              link={referralLink}
              className={!referralLinkIsReady && styles.IsLoadingReferralLink}
            >
              <Maybe
                it={referralLinkIsReady}
                orElse={<FormattedMessage defaultMessage="Cargando..." />}
              >
                {referralLink}
              </Maybe>
            </CopyLinkContainer>
            <div className={styles.ShareButtonsWrapper}>
              <a
                className={classes("btn btn-primary", styles.ShareLinkButton)}
                target="_blank"
                rel="noopener noreferrer"
                href={getMailShareLink(shareEmailSubject, shareMessage)}
              >
                <FormattedMessage defaultMessage="Correo" />
              </a>
              <a
                className={classes("btn btn-primary", styles.ShareLinkButton)}
                target="_blank"
                rel="noopener noreferrer"
                href={getWhatsappSharingLink(shareMessage)}
              >
                <FormattedMessage defaultMessage="Whatsapp" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </PageContainer>
  );
}

export { ReferralsInvitePage };
