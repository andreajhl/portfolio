import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useAuth } from "lib/famosos-auth";
import { FormattedMessage } from "react-intl";
import { getFirstName } from "react-app/src/utils/getFirstName";
import { ReferralsPageHeading } from "react-app/src/components/layouts/referrals-page-heading";
import { NavLink } from "../../common/routing";
import { REFERRALS_LIST, REFERRALS_PRIZES } from "constants/paths";
import { useRouter } from "next/router";
import { SHOW_BACK_BUTTON_QUERY_PARAM } from "constants/keys";
import useIsOpen from "lib/hooks/useIsOpen";
import { OffCanvasShareReferralLinkMenu } from "react-app/src/components/common/widgets/off-canvas-share-referral-link-menu";

function ReferralsHomePage() {
  const { open, close, isOpen } = useIsOpen(false);
  const { query } = useRouter();
  const showBackButton = Boolean(query?.[SHOW_BACK_BUTTON_QUERY_PARAM]);
  const { user } = useAuth();
  const userFirstName = getFirstName(user?.fullName || "Usuario");
  const starCount = user?.stars || 0;

  return (
    <PageContainer showSearch={false}>
      <main className={styles.ReferralsHomePage}>
        <div
          className={classes("container", styles.ReferralsHomePageContainer)}
        >
          <ReferralsPageHeading
            showBackButton={showBackButton}
            avatarSize={140}
            title={
              <FormattedMessage
                defaultMessage="¡Hola, {userFirstName}!"
                values={{ userFirstName }}
              />
            }
          />
          <div className={styles.ReferralsStarsCountWrapper}>
            <span className={styles.ReferralsStarsCountNumber}>
              {starCount}
            </span>
            <img
              src="/assets/img/referrals-home-star.svg"
              alt="Total referrals"
              width="283"
              height="283"
            />
          </div>
        </div>
      </main>
      <footer className={styles.ReferralsHomePageFooter}>
        <div
          className={classes("container", styles.ReferralsHomePageContainer)}
        >
          <button
            onClick={open}
            className={classes(styles.FooterLink, styles.ShareButton)}
          >
            <FormattedMessage defaultMessage="Compartir" />
          </button>
          <NavLink className={styles.FooterLink} to={REFERRALS_PRIZES}>
            <FormattedMessage defaultMessage="Ver Premios" />
          </NavLink>
          <NavLink className={styles.FooterLink} to={REFERRALS_LIST}>
            <FormattedMessage defaultMessage="Ver Referidos" />
          </NavLink>
        </div>
      </footer>
      <OffCanvasShareReferralLinkMenu isOpen={isOpen} onClose={close} />
    </PageContainer>
  );
}

export { ReferralsHomePage };
