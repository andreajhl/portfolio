function generateArrayOfNumbers(maxNumbersToGenerate) {
  const array = [];
  for (let i = 0; i < maxNumbersToGenerate; i++) {
    array.push(i + 1);
  }
  return array;
}
export { generateArrayOfNumbers };
