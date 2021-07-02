const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

const generateHttpOnlyCookie = ():
  | { httpOnly: boolean }
  | { httpOnlys: boolean } => {
  if (ENVIRONMENT === "development") {
    return { httpOnly: true };
  } else {
    return { httpOnlys: true };
  }
};
export { generateHttpOnlyCookie };
