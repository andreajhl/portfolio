import isBrowser from "./isBrowser";

const getWindow = () => (isBrowser() ? window : { location: { pathname: "" } });

export default getWindow;
