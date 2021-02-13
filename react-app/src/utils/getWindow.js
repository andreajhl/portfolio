import isBrowser from "./isBrowser";

function noop() {}

const getWindow = () =>
  isBrowser()
    ? window
    : {
        location: {
          pathname: "",
          userLocation: { countryCode: "" },
          sessionStorage: {
            setItem: noop,
            getItem: noop,
            removeItem: noop
          }
        }
      };

export default getWindow;
