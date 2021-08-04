import AppLinksBanner from "desktop-app/components/footer/app-links-banner";
import CelebritiesFormCTA from "desktop-app/components/footer/celebrities-form-cta";
import SocialNetWorksWebPage from "desktop-app/components/footer/social-networks-webpage";
import SubscriptionNewsletterForm from "desktop-app/components/footer/subscription-newsletter-form";
import WebPageListLinks from "desktop-app/components/footer/webpage-list-links";
import WebPageMeta from "desktop-app/components/footer/webpage-meta";
import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

const FooterPage = () => {
  const currentYear = new Date()?.getFullYear?.() || "2021";
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
          <AppLinksBanner />
        </div>
        <div className={styles.FooterContainerSectionGeneralLinks}>
          <div>
            <WebPageListLinks />
          </div>
          <div>
            <SocialNetWorksWebPage />
          </div>
        </div>
        <div className={styles.FooterContainerSectionMetaPage}>
          <WebPageMeta />
          <div className={styles.FooterCopyright}>
            <span>
              © {currentYear} Famosos, Inc.{" "}
              <FormattedMessage defaultMessage="Todos los derechos reservados" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
