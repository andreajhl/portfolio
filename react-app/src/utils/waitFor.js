const waitFor = (
  resultCallback = () => true,
  intervalInSeconds = 1000,
  totalTries = 10
) => {
  if (typeof resultCallback !== "function") {
    throw new TypeError("Received `resultCallback` arg must be a function");
  }
  if (typeof intervalInSeconds !== "number") {
    throw new TypeError("Received `intervalInSeconds` arg must be a number");
  }
  if (typeof totalTries !== "number") {
    throw new TypeError("Received `totalTries` arg must be a number");
  }
  let tries = totalTries;

  const firstTry = resultCallback();
  tries--;
  if (firstTry) {
    return firstTry;
  }

  let interval;

  return new Promise((resolve) => {
    interval = setInterval(() => {
      if (!tries) resolve(null);
      const result = resultCallback();
      if (result) {
        resolve(result);
        clearInterval(interval);
      } else {
        tries--;
      }
    }, intervalInSeconds);
  });
};

export default waitFor;
