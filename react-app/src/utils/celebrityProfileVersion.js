import { CELEBRITY_PROFILE_VERSION } from "../constants/localStorageKeys";

export const getCelebrityProfileVersion = () =>
  sessionStorage.getItem(CELEBRITY_PROFILE_VERSION);

export const setCelebrityProfileVersion = (value) =>
  sessionStorage.setItem(CELEBRITY_PROFILE_VERSION, value);

export const removeCelebrityProfileVersion = (value) =>
  sessionStorage.removeItem(CELEBRITY_PROFILE_VERSION);

export const setCelebrityProfileVersionDependingOfTime = () => {
  if (getCelebrityProfileVersion()) return;
  const profileVersionDependingOfTime = Date.now() % 2 === 0 ? "A" : "B";
  setCelebrityProfileVersion(profileVersionDependingOfTime);
};
