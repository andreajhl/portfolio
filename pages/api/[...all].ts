import axios from "axios";

const catchAllRoutesHandler = async ({ url, method, query }, response) => {
  const backendUrl = url.replace("/api/", process.env.NEXT_PUBLIC_ENDPOINT);
  const backendResponse = await axios[String(method).toLowerCase()](backendUrl);
  const { data } = backendResponse;
  response.json(data);
};

export default catchAllRoutesHandler;
