import { getUserIp } from "./getUserIp";
import { getUserLocationData } from "./getUserLocationData";
import { IncomingMessage, ServerResponse } from "http";

export async function getLocationCookieHeader(req: IncomingMessage) {
  const userLocationValue = await getUserLocationData(req);
  const userIpAddress = getUserIp(req);
  return {
    ...userLocationValue,
    userIpAddressLocation: userIpAddress
  };
}
