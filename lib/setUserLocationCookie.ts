import { parse } from "cookie";
import {
  USER_LOCATION_KEY,
  USER_IP_ADDRESS,
  USER_CURRENCY_CODE,
  CURRENT_CURRENCY_TRM_CODE,
} from "constants/keys";
import axios from "axios";
import isBot from "isbot";
import { IncomingMessage, ServerResponse } from "http";
import { DocumentContext } from "next/document";
import debug from "react-app/src/utils/debug";
import findAvailableCurrencyByName from "react-app/src/utils/findAvailableCurrencyByName";
import {
  serializeCurrencyCurrentData,
  serializeUserLocationCookies,
} from "./serializeCookies";

const ONE_YEAR_IN_MILLISECONDS = 365 * 24 * 3600 * 1000;
const invalidIpAddresses = ["127.0.0.1", "::1"];

function getUserIp(request: IncomingMessage) {
  let userIp =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;

  if (typeof userIp === "string") {
    userIp = userIp.split(",");
  }

  return userIp[0].trim();
}

async function getIpData(userIp: string) {
  const response = await axios.get<{
    country_code: string;
    currency: {
      code: string;
    };
  }>(
    `http://api.ipstack.com/${userIp}?access_key=ac1c0a88db0de9da13fcdba5d6742384&fields=country_code,currency.code`
  );
  return {
    country_code: response.data["country_code"] || "",
    currency_code: response.data?.currency?.code || "",
  };
}

const getUserLocationData = async (
  request: IncomingMessage
): Promise<{
  country_code: string;
  currency_code: string;
}> => {
  try {
    let userIp = getUserIp(request);
    if (!userIp || invalidIpAddresses.includes(userIp))
      return {
        country_code: "",
        currency_code: "",
      };
    debug("Se va a llamar a IPStack con la IP", userIp);
    const response = await getIpData(userIp);
    debug("IPStack posee response", JSON.stringify(response));
    return response;
  } catch (error) {
    return {
      country_code: "",
      currency_code: "",
    };
  }
};

async function getLocationCookieHeader(
  req: IncomingMessage,
  res: ServerResponse
) {
  const userLocationValue = await getUserLocationData(req);
  const userIpAddress = getUserIp(req);
  return {
    ...userLocationValue,
    userIpAddressLocation: userIpAddress,
  };
}
async function getCurrencyCurrentTRMCookieHeader(currency: string) {
  let currencyCode = null;
  if (findAvailableCurrencyByName(currency)) {
    currencyCode = currency;
  } else {
    currencyCode = "USD";
  }
  const FINAL_PATH =
    process.env.NEXT_PUBLIC_ENDPOINT +
    "custom-endpoints/gateway-payment-methods/currency-exchange";
  try {
    const response = await axios.get<{
      data: {
        from: string;
        rate: number;
        to: string;
      };
    }>(FINAL_PATH, {
      params: {
        from: "USD",
        to: currencyCode,
      },
    });
    return {
      currencyCurrentTRM: response.data?.data?.rate || "",
      currentCurrencyTRMCode: response.data?.data?.to,
    };
  } catch (error) {
    debug("Error relizando llamada a " + FINAL_PATH, error);
    return {
      currencyCurrentTRM: 1,
      currentCurrencyTRMCode: "USD",
    };
  }
}

const setUserLocationCookie = async ({
  req,
  res,
}: DocumentContext): Promise<void> => {
  if (!req) return;

  if (isBot(req.headers["user-agent"])) {
    return debug("Este es un bot solicitando", req.url);
  }

  const cookies = parse(req?.headers?.cookie || "");
  let newCookiesSerializes = [];

  if (
    (!(USER_LOCATION_KEY in cookies) ||
      !(USER_IP_ADDRESS in cookies) ||
      !(USER_CURRENCY_CODE in cookies)) &&
    !res.getHeader(USER_LOCATION_KEY) &&
    !res.getHeader(USER_CURRENCY_CODE) &&
    !res.getHeader(USER_IP_ADDRESS)
  ) {
    const locationCookies = await getLocationCookieHeader(req, res);
    const currencyCurrentData = await getCurrencyCurrentTRMCookieHeader(
      locationCookies.currency_code
    );
    newCookiesSerializes.push(...serializeUserLocationCookies(locationCookies));
    newCookiesSerializes.push(
      ...serializeCurrencyCurrentData(currencyCurrentData)
    );
  } else if (
    res.getHeader(USER_IP_ADDRESS) &&
    res.getHeader(USER_CURRENCY_CODE) &&
    res.getHeader(USER_LOCATION_KEY)
  ) {
    const currencyCurrentData = await getCurrencyCurrentTRMCookieHeader(
      String(res.getHeader(USER_CURRENCY_CODE))
    );
    newCookiesSerializes.push(
      ...serializeUserLocationCookies({
        currency_code: String(res.getHeader(USER_CURRENCY_CODE)),
        userIpAddressLocation: String(res.getHeader(USER_IP_ADDRESS)),
        country_code: String(res.getHeader(USER_LOCATION_KEY)),
      })
    );
    newCookiesSerializes.push(
      ...serializeCurrencyCurrentData(currencyCurrentData)
    );
  } else {
    const currencyCurrentData = await getCurrencyCurrentTRMCookieHeader(
      cookies[CURRENT_CURRENCY_TRM_CODE] || cookies[USER_CURRENCY_CODE]
    );
    newCookiesSerializes.push(
      ...serializeCurrencyCurrentData(currencyCurrentData)
    );
  }
  res.setHeader("Set-Cookie", newCookiesSerializes);
};

export default setUserLocationCookie;
