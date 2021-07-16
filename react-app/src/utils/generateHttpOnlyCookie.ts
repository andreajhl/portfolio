const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

const generateHttpOnlyCookie = ():
  | { httpOnly: boolean }
  | { httpsOnly: boolean } => {
  if (ENVIRONMENT === "development") {
    return { httpOnly: true };
  } else {
    return { httpsOnly: true };
  }
};
export { generateHttpOnlyCookie };
