import { localeAvailables } from "./../../react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";

import { AUTH_SUCCESS } from "react-app/src/routing/Paths";
import { NEXT_LOCALE, USER_LOCATION_KEY, USER_UTMS_KEY } from "constants/keys";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import { famososAuthService } from "lib/famosos-auth";
import { getUTMsFromObject } from "lib/utils/utms";

const ERROR_MESSAGE_CODE_NOT_FOUND = "No code was provided";

async function googleCallbackHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // Send Facebook Code to Famosos.com Backend
  const code = req.query["code"];
  const cookies = parse(req.headers.cookie);

  // Validate facebook code callback
  if (code === null || code === undefined) {
    res.writeHead(302, {
      Location: `/auth/sign-in?error=${encodeURIComponent(
        ERROR_MESSAGE_CODE_NOT_FOUND
      )}`,
    });
    return res.end();
  }

  const userUTMs = getUTMsFromObject(
    JSON.parse(cookies?.[USER_UTMS_KEY] || "{}")
  );

  // Send code to famosos auth and save the JWT Token in Cookies
  await famososAuthService
    .post("/google/sign-in", {
      googleCode: req.query["code"],
      redirectURL: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT,
      locale:
        transformUserNavigatorLanguageToISO2Code(
          cookies[NEXT_LOCALE] as localeAvailables
        ) || "es",
      countryAlpha2Code: cookies[USER_LOCATION_KEY] || "",
      ...userUTMs,
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
              sameSite: "lax",
              maxAge: ONE_YEAR_IN_MILLISECONDS,
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
