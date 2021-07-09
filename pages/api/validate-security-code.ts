import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axios from "axios";
import { generateHttpOnlyCookie } from "react-app/src/utils/generateHttpOnlyCookie";
import { ONE_YEAR_IN_MILLISECONDS } from "constants/oneYearINMilliseconds";

async function validateSecurityCode(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { method } = req;
  if (method === "POST") {
    // Send Email to Famosos Auth Backend
    const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
    const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;

    // Send code to famosos auth and save the JWT Token in Cookies
    await axios
      .post(`${endpoint}/${version}/famosos-com/validate-security-code`, {
        email: req.body["email"],
        securityCode: req.body["securityCode"]
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
                // ...generateHttpOnlyCookie()
              }
            )
          );
          return res.status(200).end();
        } else {
          res.json({
            status: "error",
            error: response.data.error
          });
        }
      })
      .catch((errorResponse) => {
        console.log({ errorResponse });
        if (errorResponse.response) {
          return res.status(errorResponse.response.status || 400).json({
            status: "error",
            error: errorResponse.response.data.error
          });
        } else {
          return res.status(400).json({
            status: "error",
            error: "Unexpected Error"
          });
        }
      });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default validateSecurityCode;
