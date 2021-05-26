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
          sessionStorage: {
            setItem: noop,
            getItem: noop,
            removeItem: noop,
          },
        },
        navigator: { userAgent: "", clipboard: { writeText: noop } },
      };

export default getWindow;
