import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse<{}>) => {

  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;
  const code = req.query["code"];

  // Validate facebook code callback
  if (code === null || code === undefined) {
    res.writeHead(302, { "Location": "/authentication/failure?error=No code was provided" });
    res.end();
  }

  // Send code to famosos auth and save the JWT Token in Cookies
  await axios
    .post(
      `${endpoint}/${version}/famosos-com/google/sign-in`,
      {
        "googleCode": req.query["code"],
        "redirectURL": process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT
      }
    )
    .then(response => {
        const status = response.data.status;
        const data = response.data.data;
        if (status === "OK") {
          // SSR
          res.setHeader(
            "Set-Cookie",
            serialize(process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME, data.token, {
              path: "/",
              httpOnly: true,
              sameSite: "lax"
            })
          );
          res.redirect("/authentication/success");
        } else {
          res.redirect(`/authentication/failure?error=${response.data.error}`);
        }
        return;
      }
    )
    .catch(errorResponse => {
        if (errorResponse.response) {
          res.redirect(`/authentication/failure?error=${errorResponse.response.data.error}`);
        } else {
          res.redirect(`/authentication/failure?error=Unexpected Error`);
        }
        return;
      }
    );
};
