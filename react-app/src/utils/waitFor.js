import CancellablePromise from "./CancellablePromise";

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

  const cancellablePromise = new CancellablePromise((resolve) => {
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

  cancellablePromise.catch(() => clearInterval(interval));

  return cancellablePromise;
};

export default waitFor;
