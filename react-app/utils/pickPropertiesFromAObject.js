const pickPropertiesFromAObject = (object, allowedKeys) => {
  if (typeof object !== "object") {
    throw new TypeError("The argument 'object' must be an object");
  }
  if (!Array.isArray(allowedKeys)) {
    throw new TypeError("The argument 'allowedKeys' must be an array");
  }
  if (allowedKeys.some((item) => typeof item !== "string")) {
    throw new TypeError("The argument 'allowedKeys' must only has strings");
  }

  const entries = Object.entries(object);
  const filteredEntries = entries.filter(([key]) => allowedKeys.includes(key));
  return filteredEntries.reduce(
    (newObject, [key, value]) => ({ ...newObject, [key]: value }),
    {}
  );
};

export default pickPropertiesFromAObject;
