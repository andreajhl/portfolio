import { CELEBRITY_PROFILE_VERSION_KEY } from "constants/keys";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { serialize } from "cookie";
import getCookie from "lib/utils/getCookie";
import getWindow from "./getWindow";

export const getCelebrityProfileVersion = (cookieString) =>
  getCookie(CELEBRITY_PROFILE_VERSION_KEY, cookieString);

export const setCelebrityProfileVersion = (celebrityProfileVersion) => {
  getWindow().document.cookie = serialize(
    CELEBRITY_PROFILE_VERSION_KEY,
    celebrityProfileVersion,
    {
      maxAge: ONE_YEAR_IN_MILLISECONDS,
    }
  );
};

export const removeCelebrityProfileVersion = () => {
  getWindow().document.cookie = serialize(CELEBRITY_PROFILE_VERSION_KEY, "");
};

export const setCelebrityProfileVersionDependingOfTime = () => {
  if (getCelebrityProfileVersion()) return;
  const profileVersionDependingOnTime = getProfileVersionDependingOnTime();
  setCelebrityProfileVersion(profileVersionDependingOnTime);
};

export function getProfileVersionDependingOnTime() {
  return Date.now() % 2 === 0 ? "B" : "C";
}
