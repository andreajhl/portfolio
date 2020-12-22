"use strict";

const cookiesConsentElement = document.querySelector(".cookies-consent");

const removeOnHidden = ({ propertyName }) => {
  if (propertyName === "opacity") {
    cookiesConsentElement.remove();
  }
};

const hideCookiesConsent = () => cookiesConsentElement.classList.add("hidden");

const displayCookiesConsent = () =>
  (cookiesConsentElement.style.display = "initial");

cookiesConsentElement.addEventListener("transitionend", removeOnHidden);

const setupCookiesConsent = () => {
  const hasAcceptedCookiesConsent = localStorage.getItem(
    "hasAcceptedCookiesConsent"
  );
  if (hasAcceptedCookiesConsent === "true") {
    hideCookiesConsent();
  } else {
    displayCookiesConsent();
  }
};

window.addEventListener("load", setupCookiesConsent);

const acceptCookiesConsent = () => {
  localStorage.setItem("hasAcceptedCookiesConsent", true);
  hideCookiesConsent();
};

const cookiesConsentAcceptButton = document.querySelector(
  ".cookies-consent__accept-button"
);

cookiesConsentAcceptButton.addEventListener("click", acceptCookiesConsent);
