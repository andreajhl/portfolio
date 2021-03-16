import React from "react";
import styles from "./styles.module.scss";
const AppLinksBanner = () => {
  return (
    <div className={styles.AppLinksBannerContainer}>
      <p>Descarga la app para Fans</p>
      <div>
        <img
          height={"auto"}
          src="/assets/img/app-google-play-badge.png"
          alt="Descargar APP desde Google Play Store"
        />
        <img
          height={"auto"}
          src="/assets/img/app-store-badge.png"
          alt="Descargar APP desde APP Store"
        />
        <img
          height={"auto"}
          src="/assets/img/app-gallery-badge.png"
          alt="Descargar APP desde app Gallery"
        />
      </div>
    </div>
  );
};

export default AppLinksBanner;
