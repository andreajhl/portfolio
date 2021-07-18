import isBrowser from "./isBrowser";

function noop() {}

const getWindow = () =>
  isBrowser()
    ? window
    : {
        document: { cookie: "" },
        location: {
          origin: "",
          pathname: "",
          userLocation: { countryCode: "" },
        },
        localStorage: {
          setItem: noop,
          getItem: noop,
          removeItem: noop,
        },
        sessionStorage: {
          setItem: noop,
          getItem: noop,
          removeItem: noop,
        },
        navigator: { userAgent: "", clipboard: { writeText: noop } },
      };

export default getWindow;
