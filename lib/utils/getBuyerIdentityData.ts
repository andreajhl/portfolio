import { generateDeviceId } from "react-app/src/utils/generateDeviceId";
import { USER_GEOLOCATION_KEY, USER_IP_ADDRESS } from "constants/keys";
import { getIpAddress } from "react-app/src/state/utils/localizationApiService";
import getCookie from "react-app/src/utils/getCookie";
import getWindow from "react-app/src/utils/getWindow";

async function getBuyerIp() {
  let IP = null;
  const userIpFromCookies = getCookie(USER_IP_ADDRESS);
  if (userIpFromCookies) {
    IP = userIpFromCookies;
  } else {
    const userIpGetFromExternalService = await getIpAddress();
    IP = userIpGetFromExternalService;
  }
  return IP;
}

async function getBuyerIdentityData() {
  const IP = await getBuyerIp();
  const geolocation = getCookie(USER_GEOLOCATION_KEY);
  const userAgent = getWindow().navigator.userAgent;
  const deviceId = String(generateDeviceId());
  return { deviceId, IP, userAgent, geolocation };
}

export default getBuyerIdentityData;
