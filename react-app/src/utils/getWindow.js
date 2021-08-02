import isBrowser from "./isBrowser";

function noop() {}

const getWindow = () =>
  isBrowser()
    ? window
    : {
        document: { cookie: "" },
        location: {
          pathname: "",
          userLocation: { countryCode: "" },
          sessionStorage: {
            setItem: noop,
            getItem: noop,
            removeItem: noop
          }
        },
        localStorage: {
          setItem: noop,
          getItem: noop,
          removeItem: noop
        },
        navigator: { userAgent: "" }
      };

export default getWindow;
