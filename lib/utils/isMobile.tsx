import { IncomingMessage } from "http";
import UAParser from "ua-parser-js";

const isMobile = (req: IncomingMessage): boolean =>
  new UAParser(req.headers["user-agent"]).getDevice().type === "mobile";

export default isMobile;
