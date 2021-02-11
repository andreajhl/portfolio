import isBrowser from "./isBrowser";

const getWindow = () =>
  isBrowser()
    ? window
    : { location: { pathname: "", userLocation: { countryCode: "" } } };

export default getWindow;
