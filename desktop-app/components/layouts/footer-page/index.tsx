import AppLinksBanner from "desktop-app/components/containers/app-links-banner";
import CelebritiesFormCTA from "desktop-app/components/containers/celebrities-form-cta";
import SocialNetWorksWebPage from "desktop-app/components/containers/social-networks-webpage";
import SubscriptionNewsletterForm from "desktop-app/components/containers/subscription-newsletter-form";
import WebPageListLinks from "desktop-app/components/containers/webpage-list-links";
import WebPageMeta from "desktop-app/components/containers/webpage-meta";
import React from "react";
import styles from "./styles.module.scss";
const FooterPage = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterContainerSectionForm}>
          <div className={styles.FooterContainerSectionFormElements}>
            <SubscriptionNewsletterForm />
            <CelebritiesFormCTA />
          </div>
        </div>
        <div className={styles.FooterContainerSectionAppsLinks}>
          <AppLinksBanner></AppLinksBanner>
        </div>
        <div className={styles.FooterContainerSectionGeneralLinks}>
          <div>
            <WebPageListLinks></WebPageListLinks>
          </div>
          <div>
            <SocialNetWorksWebPage />
          </div>
        </div>
        <div className={styles.FooterContainerSectionMetaPage}>
          <WebPageMeta />
          <div className={styles.FooterCopyright}>
            <span>© 2021 Famosos, Inc. All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
