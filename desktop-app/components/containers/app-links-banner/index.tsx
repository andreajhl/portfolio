import React from "react";
import styles from "./styles.module.scss";
const AppLinksBanner = () => {
  return (
    <div className={styles.AppLinksBannerContainer}>
      <p>Descarga la app para Fans</p>
      <div>
        <a href="/" target="_top">
          <img
            height={"55px"}
            width={"142px"}
            src="/assets/img/app-google-play-badge.png"
            alt="Descargar APP desde Google Play Store"
          />
        </a>
        <a href="/">
          <img
            height={"36px"}
            width={"112px"}
            src="/assets/img/app-store-badge.png"
            alt="Descargar APP desde APP Store"
          />
        </a>
        <a href="/">
          <img
            height={"36px"}
            width={"112px"}
            src="/assets/img/app-gallery-badge.png"
            alt="Descargar APP desde app Gallery"
          />
        </a>
      </div>
    </div>
  );
};

export default AppLinksBanner;
