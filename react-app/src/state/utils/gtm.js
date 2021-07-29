import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import isBrowser from "react-app/src/utils/isBrowser";
import waitFor from "react-app/src/utils/waitFor";
import getWindow from "react-app/src/utils/getWindow";
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

    // // Segment
    // if (ENV !== "development") {
    //   window.analytics.track(event, {
    //     ...dataLayer,
    //     ENVIRONMENT: ENV.toUpperCase()
    //   });
    // }
  } catch (e) {
    console.warn("tagManagerDataLayer Error:", e);
  }
};

export async function fbPixel(...params) {
  if (!isBrowser()) return;
  const fbq = await waitFor(() => window.fbq);
  if (typeof fbq !== "function") return;
  fbq(...params);
}

export function trackContractPurchase({ celebrityId, contractPrice }) {
  return fbPixel("track", "Purchase", {
    content_type: "product",
    content_ids: VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrityId,
    value: contractPrice,
    currency: "USD"
  });
}

export function page(data) {
  tagManagerDataLayer("PAGE", data);
}

export function trackFirstPageLoad() {
  page({
    ENV: String(process.env.NEXT_PUBLIC_ENVIRONMENT).toUpperCase(),
    isReactRouting: false,
    path: getWindow().location.pathname,
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    receivedAt: new Date()
  });
}

export const analytics = {
  track: tagManagerDataLayer,
  fbPixel,
  trackContractPurchase,
  page,
  trackFirstPageLoad
};
