import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { generateHttpOnlyCookie } from "react-app/src/utils/generateHttpOnlyCookie";

import axios from "axios";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";

async function emailPasswordSignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;

  // Send code to famosos auth and save the JWT Token in Cookies
  await axios
    .post(`${endpoint}/${version}/famosos-com/email-password/sign-up`, {
      email: req.body["email"],
      password: req.body["password"],
      fullName: req.body["fullName"],
      birthDate: req.body["birthDate"],
      addToNewsLetter: req.body["allowNotifications"],
      locale: transformUserNavigatorLanguageToISO2Code(req.body["locale"])
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
              maxAge: ONE_YEAR_IN_MILLISECONDS
              // ...generateHttpOnlyCookie
            }
          )
        );
        res.json({
          status: "OK",
          error: null
        });
      } else {
        res.json({
          status: "error",
          error: response.data.error
        });
      }
      return;
    })
    .catch((errorResponse) => {
      if (errorResponse.response) {
        res.json({
          status: "error",
          error: errorResponse.response.data.error
        });
      } else {
        res.json({
          status: "error",
          error: "Unexpected Error"
        });
      }
      return;
    });
}

export default emailPasswordSignUpHandler;
