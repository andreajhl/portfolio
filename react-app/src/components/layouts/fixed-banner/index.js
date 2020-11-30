import React, { useState } from "react";
import "./styles.scss";

const FixedBanner = ({ position, children, localStorageKey }) => {
  const [showBanner, setShowBanner] = useState(
    () => localStorage.getItem(localStorageKey) !== "true"
  );
  const [bannerIsHidden, setBannerIsHidden] = useState(false);

  const hideBanner = () => {
    localStorage.setItem(localStorageKey, true);
    setBannerIsHidden(true);
  };

  const removeBanner = ({ propertyName }) => {
    if (propertyName === "opacity") {
      setShowBanner(false);
    }
  };
  return showBanner ? (
    <div
      className={`fixed-banner ${bannerIsHidden ? "hidden" : ""}`}
      onTransitionEnd={removeBanner}
    >
      {children(hideBanner)}
    </div>
  ) : null;
};

export { FixedBanner };
