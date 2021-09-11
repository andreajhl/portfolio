import axios from "axios";
import checkRequiredEnv from "./checkRequiredEnv";

const FAMOSOS_ANALYTICS_ENDPOINT = checkRequiredEnv(
  process.env.NEXT_PUBLIC_FAMOSOS_ANALYTICS_ENDPOINT,
  "NEXT_PUBLIC_FAMOSOS_ANALYTICS_ENDPOINT"
);

type AnalyticsDataType = {
  event: string;
  [key: string]: any;
};

function trackWithXHR(analyticsData: AnalyticsDataType) {
  return axios.post(FAMOSOS_ANALYTICS_ENDPOINT, analyticsData);
}

function trackWithBeacon(analyticsData: AnalyticsDataType) {
  return navigator.sendBeacon(
    FAMOSOS_ANALYTICS_ENDPOINT,
    JSON.stringify(analyticsData)
  );
}

function track(analyticsData: AnalyticsDataType) {
  if (!analyticsData?.event) {
    throw new TypeError(
      `The "event" property is required in "analyticsData" argument.`
    );
  }
  if (typeof analyticsData?.event !== "string") {
    throw new TypeError(
      `The "event" property of "analyticsData" must be a string.`
    );
  }
  if (typeof navigator.sendBeacon === "function") {
    return trackWithBeacon(analyticsData);
  }
  return trackWithXHR(analyticsData);
}

const famososAnalytics = { track };

export default famososAnalytics;
