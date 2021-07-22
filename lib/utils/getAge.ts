import getValidDate from "./getValidDate";

function getAge(date: string | number | Date): number {
  const today = new Date();
  const birthDate = getValidDate(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() <= birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export default getAge;
