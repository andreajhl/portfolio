import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse<{}>) => {

  // Send Facebook Code to Famosos.com Backend
  const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
  const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;

  // Send code to famosos auth and save the JWT Token in Cookies
  await axios
    .post(
      `${endpoint}/${version}/famosos-com/email-password/sign-in`,
      {
        "email": req.body["email"],
        "password": req.body["password"]
      }
    )
    .then(response => {
        console.log("response.data:", response.data);
        const status = response.data.status;
        console.log("status:", status);
        const data = response.data.data;
        console.log("data:", data);
        if (status === "OK") {
          // SSR
          res.setHeader(
            "Set-Cookie",
            serialize("SessionToken", data.token, {
              path: '/',
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
