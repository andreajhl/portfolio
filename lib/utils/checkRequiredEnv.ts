function checkRequiredEnv(value: string, name?: string) {
  if (!value) {
    throw new TypeError(
      `The environment variable ${
        name ? `"${name}"` : ""
      } is not defined in .env file`
    );
  }
  return value;
}

export default checkRequiredEnv;
