import axios from "axios";

const GET_IP_ADDRESS_API_URL = "https://api.ipify.org/";

export const getIpAddress = async () => {
  try {
    const response = await axios.get(GET_IP_ADDRESS_API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const IPSTACK_API_URL = "http://api.ipstack.com/";

const getLocalizationInfo = async (params) => {
  try {
    const ipAddress = await getIpAddress();
    const response = await axios.get(IPSTACK_API_URL + ipAddress, {
      params: {
        access_key: process.env.REACT_APP_IPSTACK_ACCESS_KEY,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getLocalizationInfo;
