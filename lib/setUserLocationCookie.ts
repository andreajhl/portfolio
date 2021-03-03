import { parse, serialize } from "cookie";
import { USER_LOCATION_KEY, USER_IP_ADDRESS } from "constants/keys";
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

async function getIpCountryCode(userIp: string) {
  const response = await axios.get(
    `http://api.ipstack.com/${userIp}?access_key=ac1c0a88db0de9da13fcdba5d6742384&fields=country_code`
  );
  return response.data["country_code"] || "";
}

const getUserLocationCountryCode = async (
  request: IncomingMessage
): Promise<string> => {
  try {
    let userIp = getUserIp(request);
    if (!userIp || invalidIpAddresses.includes(userIp)) return "";
    debug("Se va a llamar a IPStack con la IP", userIp);
    return await getIpCountryCode(userIp);
  } catch (error) {
    return "";
  }
};

async function setLocationCookieHeader(
  req: IncomingMessage,
  res: ServerResponse
) {
  const userLocationValue = await getUserLocationCountryCode(req);
  const userIpAddress = getUserIp(req);
  res.setHeader(
    "Set-Cookie",
    serialize(USER_LOCATION_KEY, userLocationValue, {
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
