import objectHasValidValues from "./objectHasValidValues";
import { USER_UTMS_KEY } from "constants/keys.js";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { serialize } from "cookie";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import getCookie from "react-app/src/utils/getCookie";

function getUTMsFromQueryParams(queryParams: { [key: string]: string }) {
  const utmSource = queryParams.utm_source;
  const utmMedium = queryParams.utm_medium;
  const utmCampaign = queryParams.utm_campaign;
  const utmTerm = queryParams.utm_term;
  const utmContent = queryParams.utm_content;
  return {
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  };
}

type UTMsType = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export function getUTMsFromObject(object: { [key: string]: string }): UTMsType {
  return pickPropertiesFromAObject(object, [
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmTerm",
    "utmContent",
  ]);
}

export function saveUTMs(queryParams: { [key: string]: any }) {
  const UTMs = getUTMsFromQueryParams(queryParams);
  if (!objectHasValidValues(UTMs)) return;
  document.cookie = serialize(USER_UTMS_KEY, JSON.stringify(UTMs), {
    maxAge: ONE_YEAR_IN_MILLISECONDS,
  });
}

export function getUTMs(): UTMsType | null {
  try {
    return JSON.parse(getCookie(USER_UTMS_KEY));
  } catch (error) {
    console.warn(error);
    return null;
  }
}
