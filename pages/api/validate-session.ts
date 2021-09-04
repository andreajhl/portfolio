import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import axios from "axios";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";
import { REDIRECT_AFTER_LOGIN } from "constants/keys";

async function validateSessionHandler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;
  const session = req.query?.s;
  let redirectTo = "";
  let redirectTo2 = "";
  if (req.query?.r !== undefined && req.query?.r !== null) {
    redirectTo = req.query?.r.toString();
  }
  if (req.query?.r2 !== undefined && req.query?.r2 !== null) {
    redirectTo2 = req.query?.r2.toString();
  }
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
        // SSR
        res.setHeader(
          "Set-Cookie",
          serialize(
            process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME,
            session.toString(),
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
        res.redirect(`/`);
      }
    })
    .catch((errorResponse) => {
      if (errorResponse.response) {
        res.redirect(
          `/`
        );
      } else {
        res.redirect(`/`);
      }
      return;
    });
}

export default validateSessionHandler;
