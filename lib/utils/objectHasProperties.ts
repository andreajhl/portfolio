const objectHasProperties = (object: { [key: string]: any }) =>
  Object.keys(object).length > 0;

export default objectHasProperties;
