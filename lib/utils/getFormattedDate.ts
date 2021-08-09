import getValidDate from "./getValidDate";

function getFormattedDate(date) {
  const dateObject = getValidDate(date);
  const monthString = dateObject.toLocaleDateString("es", {
    month: "short"
  });
  return [dateObject.getDate(), monthString, dateObject.getFullYear()].join(
    "/"
  );
}

export default getFormattedDate;
