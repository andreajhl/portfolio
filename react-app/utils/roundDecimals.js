const roundDecimals = (floatNumber, precision) => {
  return parseFloat(floatNumber.toPrecision(precision));
};

export default roundDecimals;
