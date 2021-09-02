function generateArrayOfYearsFromCurrentDate(maxYears: number) {
  const min = new Date().getFullYear();
  const max = new Date().getFullYear() + maxYears;
  const years = [];

  for (let i = min; i < max; i++) {
    years.push(i);
  }
  return years;
}
export { generateArrayOfYearsFromCurrentDate };
