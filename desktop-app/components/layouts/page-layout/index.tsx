import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { TopBar } from "../topbar";
import FooterPage from "../footer-page";
import styles from "./styles.module.scss";
import PageLayoutProps from "./types";

function PageLayout({
  showTopBar = true,
  showFooter = true,
  children,
}: PageLayoutProps) {
  return (
    <div className={styles.PageContainer}>
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
