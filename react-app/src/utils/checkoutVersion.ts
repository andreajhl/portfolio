import { CHECKOUT_VERSION_KEY } from "constants/keys";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { serialize } from "cookie";
import getCookie from "lib/utils/getCookie";
import getWindow from "./getWindow";

export function isNotUsedAnymoreCheckoutVersion(checkoutVersion: string) {
  const notUsedAnymoreVersions = [];
  return notUsedAnymoreVersions.includes(checkoutVersion);
}

export const getCheckoutVersion = (cookieString?: string) =>
  getCookie(CHECKOUT_VERSION_KEY, cookieString);

export const setCheckoutVersion = (checkoutVersion) => {
  getWindow().document.cookie = serialize(
    CHECKOUT_VERSION_KEY,
    checkoutVersion,
    {
      maxAge: ONE_YEAR_IN_MILLISECONDS,
    }
  );
};

export const removeCheckoutVersion = () => {
  getWindow().document.cookie = serialize(CHECKOUT_VERSION_KEY, "");
};

export const setCheckoutVersionDependingOfTime = () => {
  if (getCheckoutVersion()) return;
  const profileVersionDependingOnTime = getCheckoutVersionDependingOnTime();
  setCheckoutVersion(profileVersionDependingOnTime);
};

export function getCheckoutVersionDependingOnTime() {
  return Date.now() % 2 === 0 ? "A" : "B";
}
