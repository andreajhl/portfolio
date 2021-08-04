import React from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import styles from "./styles.module.scss";

const messages = defineMessages({
  googlePlayImgAlt: {
    defaultMessage: "Descargar APP desde Google Play Store",
  },
  appStoreImgAlt: {
    defaultMessage: "Descargar APP desde APP Store",
  },
  appGalleryImgAlt: {
    defaultMessage: "Descargar APP desde app Gallery",
  },
});

const AppLinksBanner = () => {
  const { formatMessage } = useIntl();
  const googlePlayImgAlt = formatMessage(messages.googlePlayImgAlt);
  const appStoreImgAlt = formatMessage(messages.appStoreImgAlt);
  const appGalleryImgAlt = formatMessage(messages.appGalleryImgAlt);

  return (
    <div className={styles.AppLinksBannerContainer}>
      <p>
        <FormattedMessage defaultMessage="Descarga la app para Fans" />
      </p>
      <div>
        <a
          href="https://play.google.com/store/apps/details?id=com.famosos.users"
          target="_blank"
          rel="noreferrer"
        >
          <img
            height={"55"}
            width={"142px"}
            src="/assets/img/app-google-play-badge.png"
            alt={googlePlayImgAlt}
          />
        </a>
        {/* <a href="/">
          <img
            height={"36px"}
            width={"112px"}
            src="/assets/img/app-store-badge.png"
            alt={appStoreImgAlt}
          />
        </a>
        <a href="/">
          <img
            height={"36px"}
            width={"112px"}
            src="/assets/img/app-gallery-badge.png"
            alt={appGalleryImgAlt}
          />
        </a> */}
      </div>
    </div>
  );
};

export default AppLinksBanner;
