import { IncomingMessage } from "http";
import debug from "react-app/src/utils/debug";
import { getIpData } from "./getIpData";
import { getUserIp } from "./getUserIp";
const invalidIpAddresses = ["127.0.0.1", "::1"];
export const getUserLocationData = async (
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
    const response = await getIpData(userIp);
    debug("IPStack posee response", JSON.stringify(response));
    return response;
  } catch (error) {
    return {
      country_code: "",
      currency_code: ""
    };
  }
};
