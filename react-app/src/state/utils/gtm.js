import TagManager from "react-gtm-module";
// import { Mixpanel } from "./mixPanel";

const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;
const INITIALIZE_GTM_PROD_MODE =
  process.env.NEXT_PUBLIC_INITIALIZE_GTM_PROD_MODE === "true";

export const initialize = () => {
  if (ENV === "production" || INITIALIZE_GTM_PROD_MODE) {
    TagManager.initialize({
      gtmId: "GTM-TCDSJ3Q"
    });
  } else {
    TagManager.initialize({
      gtmId: "GTM-NH95V75"
    });
  }
};

export const tagManagerDataLayer = (event, dataLayer) => {
  try {
    // MIX PANEL
    // Mixpanel.track(event, { ...dataLayer });

    // GTM NOTIFICATION
    window?.dataLayer?.push?.({
      ...dataLayer,
      event
    });

    // Segment
    if (ENV !== "development") {
      window.analytics.track(event, {
        ...dataLayer,
        ENVIRONMENT: ENV.toUpperCase()
      });
    }
  } catch (e) {
    console.warn("tagManagerDataLayer Error:", e);
  }
};

export const analytics = { track: tagManagerDataLayer };
