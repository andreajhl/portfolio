function objectToQueryString(object: { [key: string]: any }) {
  const onlyValidParamsEntries = Object.entries(object).filter(([_, value]) =>
    Boolean(value)
  );

  const queryStringsFromEntries = onlyValidParamsEntries.map(
    ([key, value]) => `${key}=${encodeURIComponent(String(value))}`
  );

  return "?" + queryStringsFromEntries.join("&");
}

export default objectToQueryString;
