import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { TopBar } from "../topbar";
import FooterPage from "../footer-page";
import styles from "./styles.module.scss";
import { CouponBanner } from "desktop-app/components/layouts/coupon-banner";
import PageLayoutProps from "./types";

function PageLayout({
  showTopBar = true,
  showFooter = true,
  children,
}: PageLayoutProps) {
  return (
    <div className={styles.PageContainer}>
      <div className={styles.CouponBannerSection}>
        <CouponBanner />
      </div>
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
