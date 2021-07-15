import { IncomingMessage } from "http";

export function getUserIp(request: IncomingMessage) {
  let userIp =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;

  if (typeof userIp === "string") {
    userIp = userIp.split(",");
  }

  return userIp[0].trim();
}
