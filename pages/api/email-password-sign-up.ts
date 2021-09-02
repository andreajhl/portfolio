import type { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import { famososAuthService } from "lib/famosos-auth";
import { getUTMsFromObject } from "lib/utils/utms";
import { USER_UTMS_KEY } from "constants/keys";

/**
 * Send code to famosos auth and save the JWT Token in Cookies
 */
async function emailPasswordSignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const cookies = parse(req.headers.cookie);
  const userUTMs = getUTMsFromObject(JSON.parse(cookies?.[USER_UTMS_KEY]));

  await famososAuthService
    .post("/email-password/sign-up", {
      email: req.body["email"],
      password: req.body["password"],
      fullName: req.body["fullName"],
      birthDate: req.body["birthDate"],
      addToNewsLetter: req.body["allowNotifications"],
      countryAlpha2Code: req.body["countryAlpha2Code"],
      locale: transformUserNavigatorLanguageToISO2Code(req.body["locale"]),
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
              // ...generateHttpOnlyCookie
            }
          )
        );
        res.json({
          status: "OK",
          error: null,
        });
      } else {
        res.json({
          status: "error",
          error: response.data.error,
        });
      }
      return;
    })
    .catch((errorResponse) => {
      if (errorResponse.response) {
        res.json({
          status: "error",
          error: errorResponse.response.data.error,
        });
      } else {
        res.json({
          status: "error",
          error: "Unexpected Error",
        });
      }
      return;
    });
}

export default emailPasswordSignUpHandler;
