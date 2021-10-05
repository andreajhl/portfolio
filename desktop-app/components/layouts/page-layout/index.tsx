import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { TopBar } from "../topbar";
import FooterPage from "../footer-page";
import styles from "./styles.module.scss";
import PageLayoutProps from "./types";
import { SessionCouponBanner } from "react-app/src/components/layouts/session-coupon-banner";
import { useGetSessionCouponCode } from "lib/hooks/useGetSessionCouponCode";

function PageLayout({
  showTopBar = true,
  showFooter = true,
  children,
}: PageLayoutProps) {
  const sessionCouponCode = useGetSessionCouponCode();
  const showSessionCouponBanner = typeof sessionCouponCode === "string";

  return (
    <div className={styles.PageContainer}>
      <Maybe it={showSessionCouponBanner}>
        <div className={styles.CouponBannerSection}>
          <SessionCouponBanner couponCode={sessionCouponCode} />
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
