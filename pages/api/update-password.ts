import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axios from "axios";
async function updatePassword(req: NextApiRequest, res: NextApiResponse<{}>) {
  const { method, headers } = req;
  const cookies = parse(headers.cookie);
  if (method === "POST") {
    // Send New Password to Famosos Auth Backend
    const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
    const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;
    // Send code to famosos auth and save the JWT Token in Cookies
    await axios
      .post(
        `${endpoint}/${version}/famosos-com/update-password`,
        {
          newPassword: req.body["newPassword"]
        },
        {
          headers: {
            authorization:
              "Bearer " +
              cookies[process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME]
          }
        }
      )
      .then((response) => {
        const status = response.data.status;
        const data = response.data.data;
        if (status === "OK") {
          // SSR
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

export default updatePassword;
