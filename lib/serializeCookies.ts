import { serialize } from "cookie";
import {
  CURRENT_CURRENCY_TRM_CODE,
  CURRENT_CURRENCY_TRM_RATE,
  USER_CURRENCY_CODE,
  USER_LOCATION_KEY,
} from "constants/keys";
import { USER_IP_ADDRESS } from "constants/keys";
const ONE_YEAR_IN_MILLISECONDS = 365 * 24 * 3600 * 1000;

export function serializeUserLocationCookies(locationCookies: {
  userIpAddressLocation: string;
  country_code: string;
  currency_code: string;
}) {
  let userLocationCookiesSerialize = [];
  userLocationCookiesSerialize.push(
    serialize(USER_LOCATION_KEY, locationCookies.country_code, {
      maxAge: ONE_YEAR_IN_MILLISECONDS,
    })
  );
  userLocationCookiesSerialize.push(
    serialize(USER_CURRENCY_CODE, locationCookies.currency_code, {
      maxAge: ONE_YEAR_IN_MILLISECONDS,
    })
  );
  userLocationCookiesSerialize.push(
    serialize(USER_IP_ADDRESS, locationCookies.userIpAddressLocation, {
      maxAge: ONE_YEAR_IN_MILLISECONDS,
    })
  );
  return userLocationCookiesSerialize;
}

export function serializeCurrencyCurrentData(currencyCurrentData: {
  currencyCurrentTRM: string | number;
  currentCurrencyTRMCode: string;
}) {
  let userLocationCookiesSerialize = [];
  userLocationCookiesSerialize.push(
    serialize(
      CURRENT_CURRENCY_TRM_RATE,
      currencyCurrentData.currencyCurrentTRM,
      {
        path: "/",
      }
    )
  );
  userLocationCookiesSerialize.push(
    serialize(
      CURRENT_CURRENCY_TRM_CODE,
      currencyCurrentData.currentCurrencyTRMCode,
      {
        maxAge: ONE_YEAR_IN_MILLISECONDS,

        path: "/",
      }
    )
  );
  return userLocationCookiesSerialize;
}
