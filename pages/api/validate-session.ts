import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import axios from "axios";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { REDIRECT_AFTER_LOGIN } from "constants/keys";

async function emailPasswordSignInHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;
  const session = req.query?.s;
  const redirectTo = req.query?.r;
  const redirectTo2 = req.query?.r2;
  //   Validate token
  await axios
    .get(`${endpoint}/${version}/famosos-com/get-user-data`, {
      headers: {
        authorization: "Bearer " + session,
      },
    })
    .then((response) => {
      let status = response.data.status;
      const data = response.data.data;
      if (status === "OK") {
        console.log("1");
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
            }
          )
        );
        if (redirectTo2.toString() !== "") {
          res.redirect(
            redirectTo.toString() +
              `?${REDIRECT_AFTER_LOGIN}=` +
              redirectTo2.toString()
          );
        } else {
          res.redirect(redirectTo.toString());
        }
      } else {
        console.log("2");
        res.redirect(`/authentication/failure?error=${response.data.error}`);
      }
    })
    .catch((errorResponse) => {
      if (errorResponse.response) {
        console.log("3");
        res.redirect(
          `/authentication/failure?error=${errorResponse.response.data.error}`
        );
      } else {
        res.redirect(`/authentication/failure?error=Unexpected Error`);
      }
      return;
    });
}

export default emailPasswordSignInHandler;
