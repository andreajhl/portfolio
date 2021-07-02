import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function generateSecurityCode(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  //validate method
  const { method } = req;
  if (method === "POST") {
    // Send Email to Famosos Auth Backend
    const endpoint = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT;
    const version = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_ENDPOINT_VERSION;

    // Send code to famosos auth and save the JWT Token in Cookies
    await axios
      .post(`${endpoint}/${version}/famosos-com/generate-security-code`, {
        email: req.body["email"]
      })
      .then((response) => {
        const status = response.data.status;
        const responseData = response.data.data;
        if (status === "OK") {
          // SSR
          return res.status(200).json({
            status: "OK",
            error: null,
            data: responseData
          });
        } else {
          res.json({
            status: "error",
            error: response.data.error
          });
        }
      })
      .catch((errorResponse) => {
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

export default generateSecurityCode;
