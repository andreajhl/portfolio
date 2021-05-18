function isValidDate(dateObject: number | Date) {
  return dateObject instanceof Date && !isNaN(dateObject as any);
}

function getValidDate(date: any) {
  const givenDateObject = new Date(date);
  return isValidDate(givenDateObject) ? givenDateObject : new Date();
}

export default getValidDate;
