import UAParser from "ua-parser-js";

const isMobile = (userAgent: string): boolean =>
  new UAParser(userAgent).getDevice().type === "mobile";

export default isMobile;
