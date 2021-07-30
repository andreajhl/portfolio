import axios from "axios";

export async function getIpData(userIp: string) {
  const response = await axios.get<{
    country_code: string;
    latitude: string;
    longitude: string;
    currency: {
      code: string;
    };
  }>(
    `http://api.ipstack.com/${userIp}?access_key=ac1c0a88db0de9da13fcdba5d6742384&fields=country_code,currency.code,latitude,longitude`
  );
  const latitude = response?.data?.latitude || "0";
  const longitude = response?.data?.longitude || "0";
  return {
    country_code: response.data["country_code"] || "",
    currency_code: response.data?.currency?.code || "",
    geolocation: `${latitude},${longitude}`,
  };
}
