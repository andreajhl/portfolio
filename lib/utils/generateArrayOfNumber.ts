function generateArrayOfNumbers(maxNumbersToGenerate: number) {
  return Array.from(Array(maxNumbersToGenerate), (_, x) => x);
}
export { generateArrayOfNumbers };
