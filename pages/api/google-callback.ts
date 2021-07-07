import type { NextApiRequest, NextApiResponse } from "next";
import { serialize, parse } from "cookie";
import { generateHttpOnlyCookie } from "react-app/src/utils/generateHttpOnlyCookie";

import axios from "axios";
import { AUTH_SUCCESS } from "react-app/src/routing/Paths";
import { NEXT_LOCALE } from "constants/keys";

const ERROR_MESSAGE_CODE_NOT_FOUND = "No code was provided";

async function googleCallbackHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;
  const code = req.query["code"];
  const cookies = parse(req.headers.cookie);

  // Validate facebook code callback
  if (code === null || code === undefined) {
    res.writeHead(302, {
      Location: `/auth/sign-in?error=${encodeURIComponent(
        ERROR_MESSAGE_CODE_NOT_FOUND
      )}`
    });
    return res.end();
  }

  // Send code to famosos auth and save the JWT Token in Cookies
  await axios
    .post(`${endpoint}/${version}/famosos-com/google/sign-in`, {
      googleCode: req.query["code"],
      redirectURL: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT,
      locale: cookies[NEXT_LOCALE] || "es"
    })
    .then((response) => {
      const status = response.data.status;
      const data = response.data.data;
      if (status === "OK") {
        // SSR
        res.setHeader(
          "Set-Cookie",
          serialize(
            process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME,
            data.token,
            {
              path: "/",
              sameSite: "lax"
              // ...generateHttpOnlyCookie()
            }
          )
        );
        res.redirect(AUTH_SUCCESS);
      } else {
        res.redirect(`/authentication/failure?error=${response.data.error}`);
      }
      return;
    })
    .catch((errorResponse) => {
      if (errorResponse.response) {
        res.redirect(
          `/authentication/failure?error=${errorResponse.response.data.error}`
        );
      } else {
        res.redirect(`/authentication/failure?error=Unexpected Error`);
      }
      return;
    });
}

export default googleCallbackHandler;
