import React, { useMemo } from "react";
import UAParser from "ua-parser-js";
import { FixedBanner } from "../fixed-banner";
import "./styles.scss";

const DownloadAppBanner = () => {
  const { type, vendor } = useMemo(() => new UAParser().getDevice());

  const isAppleDevice = vendor === "Apple";
  const isHuaweiDevice = vendor === "Huawei";
  if (type !== "mobile" || isAppleDevice || isHuaweiDevice) return null;

  return (
    <FixedBanner localStorageKey="hide-download-app-banner">
      {(hideBanner) => (
        <div className="container py-3 px-0">
          <div className="row align-items-center">
            <div className="col-1 mr-2">
              <button type="button" className="btn" onClick={hideBanner}>
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="col-3 text-center">
              <img
                src="assets/img/app-logo.png"
                alt="App Logo"
                className="download-app-banner__logo"
              />
            </div>
            <div className="col-5 download-app-banner__info p-0">
              <h6 className="download-app-banner__info-title">Famosos</h6>
              <p>Famosos Inc.</p>
              <div className="row download-app-banner__info-stars">
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star-half-alt text-warning" />
              </div>
              <p>Obtener en la PlayStore</p>
            </div>
            <div className="col">
              <a href="market://details?id=com.famosos.users" target="_top">
                Abrir
              </a>
            </div>
          </div>
        </div>
      )}
    </FixedBanner>
  );
};

export { DownloadAppBanner };
