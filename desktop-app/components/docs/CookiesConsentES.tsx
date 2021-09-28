import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NEWSLETTER_POPUP_IS_CLOSED } from "react-app/src/constants/localStorageKeys";
import isBrowser from "react-app/src/utils/isBrowser";
import {
  localeAvailables,
  transformUserNavigatorLanguageToISO2Code,
} from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import useScript from "react-script-hook";

const CookiesConsentMapping = {
  es: {
    isoCode: "es",
    cookiePolicyId: 65243796,
  },
  en: {
    isoCode: "en",
    cookiePolicyId: 94284502,
  },
  pt: {
    isoCode: "pt-BR",
    cookiePolicyId: 86085772,
  },
};

const useIubendaCookiesConsent = () => {
  //   const [loadConfiguration, setLoadConfiguration] = useState(false);
  const { locale } = useRouter();
  const ISO2CODE = transformUserNavigatorLanguageToISO2Code(
    locale as localeAvailables
  );
  const [loading, error] = useScript({
    src: "//cdn.iubenda.com/cs/iubenda_cs.js",
    checkForExisting: true,
    onload: () => {},
  });

  useEffect(() => {
    (window as any)._iub.csConfiguration.lang = ISO2CODE;
    (window as any)._iub.csConfiguration.cookiePolicyId =
      CookiesConsentMapping[ISO2CODE].cookiePolicyId;
  }, [ISO2CODE]);
  if (typeof window == "undefined") return;
  (window as any)!._iub = (window as any)._iub || [];
  (window as any)!._iub.csConfiguration = {
    gdprAppliesGlobally: false,
    cookiePolicyInOtherWindow: true,
    consentOnContinuedBrowsing: false,
    whitelabel: false,
    lang: CookiesConsentMapping[ISO2CODE].isoCode,
    siteId: 2296941,
    cookiePolicyId: CookiesConsentMapping[ISO2CODE].cookiePolicyId,
    banner: {
      acceptButtonDisplay: true,
      customizeButtonDisplay: true,
      acceptButtonColor: "#b71157",
      acceptButtonCaptionColor: "white",
      customizeButtonColor: "#212121",
      customizeButtonCaptionColor: "white",
      position: "bottom",
      textColor: "#ffffff",
      backgroundColor: "#000001",
      rejectButtonColor: "#0073CE",
      rejectButtonCaptionColor: "white",
      zIndex: "500",
      timeoutLoadConfiguration: 5000,
    },
  };
};

export { useIubendaCookiesConsent };
