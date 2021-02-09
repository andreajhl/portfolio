import moment from "moment";

const calculateDateDifference = (
  startDate,
  finishDate,
  inputFormat = "YYYY-MM-DD HH:mm:ss",
  outputFormat = inputFormat
) => {
  if (!startDate) {
    throw new TypeError("The arg 'startDate' is required");
  }
  if (!finishDate) {
    throw new TypeError("The arg 'finishDate' is required");
  }
  return moment
    .utc(
      moment(finishDate, inputFormat).diff(
        moment(startDate || moment(), inputFormat)
      )
    )
    .format(outputFormat);
};

export default calculateDateDifference;
