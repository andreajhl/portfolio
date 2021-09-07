import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import isBrowser from "react-app/src/utils/isBrowser";
import waitFor from "react-app/src/utils/waitFor";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import TagManager from "react-gtm-module";
import { Session } from "./session";
import { getCelebrityAnalyticsData } from "lib/utils/celebrityUtils";
import famososAnalytics from "lib/utils/famososAnalytics";
// import { Mixpanel } from "./mixPanel";

const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;
const INITIALIZE_GTM_PROD_MODE =
  process.env.NEXT_PUBLIC_INITIALIZE_GTM_PROD_MODE === "true";

export const initialize = () => {
  if (ENV === "production" || INITIALIZE_GTM_PROD_MODE) {
    TagManager.initialize({
      gtmId: "GTM-TCDSJ3Q",
    });
  } else {
    TagManager.initialize({
      gtmId: "GTM-NH95V75",
    });
  }
};

export const tagManagerDataLayer = (event, dataLayer) => {
  try {
    const analyticsData = {
      path: getWindowPathname(),
      ...dataLayer,
      event,
    };
    // MIX PANEL
    // Mixpanel.track(event, { ...dataLayer });

    // GTM NOTIFICATION
    window?.dataLayer?.push?.(analyticsData);
    famososAnalytics.track(analyticsData);

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
    currency: "USD",
  });
}

export function trackAddContractToCart({
  celebrityId,
  contractPrice,
  celebrityCountry,
  celebrityCategory,
}) {
  return fbPixel("track", "AddToCart", {
    content_type: "product",
    content_ids: VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrityId,
    value: contractPrice,
    currency: "USD",
    celebrityCountry,
    celebrityCategory,
  });
}

export function page(data) {
  const user = new Session().getSession();
  tagManagerDataLayer("PAGE_VIEW", {
    ENV: String(process.env.NEXT_PUBLIC_ENVIRONMENT).toUpperCase(),
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    receivedAt: new Date(),
    user,
    ...data,
  });
}

export function trackFirstPageLoad(analyticsData = {}) {
  page({
    isReactRouting: false,
    path: getWindowPathname(),
    ...analyticsData,
  });
}

export function trackCelebrityProfileView({ celebrity, ...analyticsData }) {
  tagManagerDataLayer("CELEBRITY_PROFILE_PAGE_VIEW", {
    celebrity: getCelebrityAnalyticsData(celebrity),
    ...analyticsData,
  });
}

export function trackUserSignIn(analyticsData = {}) {
  const user = new Session().getSession();
  analytics.track("USER_LOGIN", { user, ...analyticsData });
}

export function trackUserSignUp(analyticsData = {}) {
  const user = new Session().getSession();
  analytics.track("USER_SIGN_UP", { user, ...analyticsData });
}

export function trackInitiateCheckout({ celebrityId, contractPrice }) {
  return fbPixel("track", "InitiateCheckout", {
    content_type: "product",
    content_ids: VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrityId,
    value: contractPrice,
    currency: "USD",
  });
}

export const analytics = {
  track: tagManagerDataLayer,
  fbPixel,
  trackContractPurchase,
  page,
  trackFirstPageLoad,
  trackCelebrityProfileView,
  trackUserSignIn,
  trackUserSignUp,
  trackAddContractToCart,
  trackInitiateCheckout,
};
