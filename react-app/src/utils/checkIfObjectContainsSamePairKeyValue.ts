export function checkIfObjectContainsSamePairKeyValue(one, two) {
  for (var i in one) {
    if (!two.hasOwnProperty(i) || one[i] !== two[i]) {
      return false;
    }
  }
  return true;
}
