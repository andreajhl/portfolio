import {
  BACKSTAGE_SUBSCRIPTION_PRODUCT_ID_PREFIX,
  VIDEO_MESSAGE_PRODUCT_ID_PREFIX,
} from "constants/dynamicAds";
import isBrowser from "react-app/src/utils/isBrowser";
import waitFor from "react-app/src/utils/waitFor";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import TagManager from "react-gtm-module";
import { Session } from "./session";
import { getCelebrityAnalyticsData } from "lib/utils/celebrityUtils";
import Router from "next/router";
import famososAnalytics from "lib/utils/famososAnalytics";
import { getUTMs } from "lib/utils/utms";
import UAParser from "ua-parser-js";
import getBuyerIdentityData from "lib/utils/getBuyerIdentityData";
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
    // MIX PANEL
    // Mixpanel.track(event, { ...dataLayer });

    // GTM NOTIFICATION
    window?.dataLayer?.push?.({
      path: getWindowPathname(),
      ...dataLayer,
      event,
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
  const route = Router.route;
  tagManagerDataLayer("PAGE_VIEW", {
    ENV: String(process.env.NEXT_PUBLIC_ENVIRONMENT).toUpperCase(),
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    receivedAt: new Date(),
    user,
    pageTitle: document?.title,
    route,
    url: data?.url || getWindowPathname(),
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

const CELEBRITY_PROFILE_PAGE_VIEW_EVENT = "CELEBRITY_PROFILE_PAGE_VIEW";

async function trackProfileViewInFamososAnalytics(celebrity, analyticsData) {
  const { IP, geolocation: geoLocalization } = await getBuyerIdentityData();
  const userId = new Session().getSession()?.id ?? null;
  famososAnalytics.track({
    event: CELEBRITY_PROFILE_PAGE_VIEW_EVENT,
    utms: getUTMs(),
    timestamp: new Date(),
    userId,
    celebrityId: celebrity?.id,
    userAgent: new UAParser().getResult(),
    userIp: IP,
    geoLocalization,
    celebrityProfileVersion: analyticsData.isMobile
      ? `MOBILE-${analyticsData.celebrityProfileVersion}`
      : "DESKTOP",
    ...analyticsData,
  });
}

export function trackCelebrityProfileView({ celebrity, ...analyticsData }) {
  tagManagerDataLayer(CELEBRITY_PROFILE_PAGE_VIEW_EVENT, {
    celebrity: getCelebrityAnalyticsData(celebrity),
    ...analyticsData,
  });
  trackProfileViewInFamososAnalytics(celebrity, analyticsData);
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

export function trackInitiateSubscriptionCheckout({
  celebrityId,
  subscriptionPlanPrice,
}) {
  return fbPixel("track", "InitiateCheckout", {
    content_type: "product",
    content_ids: BACKSTAGE_SUBSCRIPTION_PRODUCT_ID_PREFIX + celebrityId,
    value: subscriptionPlanPrice,
    currency: "USD",
  });
}

export function trackSubscription({ celebrityId, subscriptionPlanPrice }) {
  return fbPixel("track", "Subscribe", {
    content_type: "product",
    content_ids: BACKSTAGE_SUBSCRIPTION_PRODUCT_ID_PREFIX + celebrityId,
    predicted_ltv: subscriptionPlanPrice * 3,
    value: subscriptionPlanPrice,
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
  trackInitiateSubscriptionCheckout,
  trackSubscription,
};
