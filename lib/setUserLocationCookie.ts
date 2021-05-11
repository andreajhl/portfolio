import { parse, serialize } from "cookie";
import {
  USER_LOCATION_KEY,
  USER_IP_ADDRESS,
  USER_CURRENCY_CODE
} from "constants/keys";
import axios from "axios";
import isBot from "isbot";
import { IncomingMessage, ServerResponse } from "http";
import { DocumentContext } from "next/document";
import debug from "react-app/src/utils/debug";

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
    currency_code: response.data?.currency?.code || ""
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
        currency_code: ""
      };
    debug("Se va a llamar a IPStack con la IP", userIp);
    return await getIpData(userIp);
  } catch (error) {
    return {
      country_code: "",
      currency_code: ""
    };
  }
};

async function setLocationCookieHeader(
  req: IncomingMessage,
  res: ServerResponse
) {
  const userLocationValue = await getUserLocationData(req);
  const userIpAddress = getUserIp(req);
  res.setHeader(
    "Set-Cookie",
    serialize(USER_LOCATION_KEY, userLocationValue.country_code, {
      maxAge: ONE_YEAR_IN_MILLISECONDS
    })
  );
  res.setHeader(
    "Set-Cookie",
    serialize(USER_CURRENCY_CODE, userLocationValue.currency_code, {
      maxAge: ONE_YEAR_IN_MILLISECONDS
    })
  );
  res.setHeader(
    "Set-Cookie",
    serialize(USER_IP_ADDRESS, userIpAddress, {
      maxAge: ONE_YEAR_IN_MILLISECONDS
    })
  );
}

const setUserLocationCookie = async ({
  req,
  res
}: DocumentContext): Promise<void> => {
  if (!req) return;
  if (isBot(req.headers["user-agent"])) {
    return debug("Este es un bot solicitando", req.url);
  }
  const cookies = parse(req?.headers?.cookie || "");
  if (USER_LOCATION_KEY in cookies && USER_IP_ADDRESS in cookies) return;
  await setLocationCookieHeader(req, res);
};

export default setUserLocationCookie;
