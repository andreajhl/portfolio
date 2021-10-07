import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { TopBar } from "../topbar";
import FooterPage from "../footer-page";
import styles from "./styles.module.scss";
import PageLayoutProps from "./types";
import { SessionCouponBanner } from "react-app/src/components/layouts/session-coupon-banner";
import { useGetSessionCouponCode } from "lib/hooks/useGetSessionCouponCode";
import { ReferralFirstBuyDiscountBanner } from "react-app/src/components/layouts/referral-first-buy-discount-banner";
import isReferralWithFirstBuyDiscount from "lib/utils/isReferralWithFirstBuyDiscount";
import { useAuth } from "lib/famosos-auth";

function PageLayout({
  showTopBar = true,
  showFooter = true,
  children,
}: PageLayoutProps) {
  const { user } = useAuth();

  const showReferralDiscountBanner = isReferralWithFirstBuyDiscount(user);

  const sessionCouponCode = useGetSessionCouponCode();
  const showSessionCouponBanner = typeof sessionCouponCode === "string";

  return (
    <div className={styles.PageContainer}>
      <Maybe
        it={showReferralDiscountBanner}
        orElse={
          <Maybe it={showSessionCouponBanner}>
            <div className={styles.BannerSection}>
              <SessionCouponBanner couponCode={sessionCouponCode} />
            </div>
          </Maybe>
        }
      >
        <div className={styles.BannerSection}>
          <ReferralFirstBuyDiscountBanner />
        </div>
      </Maybe>
      <Maybe it={showTopBar}>
        <TopBar />
      </Maybe>
      <div className={styles.PageContainerChildren}>{children}</div>
      <Maybe it={showFooter}>
        <FooterPage />
      </Maybe>
    </div>
  );
}

export default PageLayout;
