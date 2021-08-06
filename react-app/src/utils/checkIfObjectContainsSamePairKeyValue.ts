export function checkIfObjectContainsSamePairKeyValue(
  one: object,
  two: object,
  strictComparison: boolean = true
) {
  for (let i in one) {
    // eslint-disable-next-line eqeqeq
    if (
      !two.hasOwnProperty(i) || strictComparison
        ? one[i] !== two[i]
        : one[i] != two[i]
    ) {
      return false;
    }
  }
  return true;
}
