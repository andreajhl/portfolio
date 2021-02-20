import { CELEBRITY_PROFILE_VERSION } from "../constants/localStorageKeys";
import getWindow from "./getWindow";

export const getCelebrityProfileVersion = () =>
  getWindow().sessionStorage.getItem(CELEBRITY_PROFILE_VERSION);

export const setCelebrityProfileVersion = (value) =>
  getWindow().sessionStorage.setItem(CELEBRITY_PROFILE_VERSION, value);

export const removeCelebrityProfileVersion = () =>
  getWindow().sessionStorage.removeItem(CELEBRITY_PROFILE_VERSION);

export const setCelebrityProfileVersionDependingOfTime = () => {
  if (getCelebrityProfileVersion()) return;
  const profileVersionDependingOnTime = getProfileVersionDependingOnTime();
  setCelebrityProfileVersion(profileVersionDependingOnTime);
};

export function getProfileVersionDependingOnTime() {
  return Date.now() % 2 === 0 ? "A" : "B";
}
