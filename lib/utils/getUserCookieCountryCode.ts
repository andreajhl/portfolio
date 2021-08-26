import { USER_LOCATION_KEY } from "constants/keys";
import getCookie from "./getCookie";

export function getUserCookieCountryCode() {
  const userCookieCountryCode = getCookie(USER_LOCATION_KEY);

  return userCookieCountryCode;
}
