import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import FooterPage from "../footer-page";
import styles from "./styles.module.scss";
type PageContainerProps = {
  showFooter: boolean;
  children: React.ReactNode;
};

const PageContainer = ({ showFooter, children }: PageContainerProps) => {
  return (
    <div className={styles.PageContainer}>
      <div className={styles.PageContainerChildren}>{children}</div>
      <Maybe it={showFooter}>
        <FooterPage></FooterPage>
      </Maybe>
    </div>
  );
};

export default PageContainer;
