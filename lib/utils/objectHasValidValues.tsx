function objectHasValidValues(errors: { [key: string]: any }) {
  const values = Object.values(errors);
  const validValues = values.filter(Boolean);
  return validValues.length > 0;
}

export default objectHasValidValues;
