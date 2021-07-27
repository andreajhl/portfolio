import { USER_LOCATION_KEY } from "constants/keys";
import { useEffect, useState } from "react";
import getCookie from "react-app/src/utils/getCookie";

const getUserLocationCookie = () => getCookie(USER_LOCATION_KEY);

function useUserLocation() {
  const [userLocation, setUserLocation] = useState(getUserLocationCookie);

  useEffect(() => {
    setUserLocation(getUserLocationCookie);
  }, []);

  return userLocation;
}

export default useUserLocation;
