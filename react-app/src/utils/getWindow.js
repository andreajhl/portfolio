import isBrowser from "./isBrowser";

const getWindow = () =>
  isBrowser()
    ? window
    : {
        location: { pathname: "", userLocation: { countryCode: "" } },
        navigator: { userAgent: "" }
      };

export default getWindow;
