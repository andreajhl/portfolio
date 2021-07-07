/**
 * To get a proper format for the backend API.
 */
const getFormattedInputDateValue = (inputDateValue: string) =>
  inputDateValue?.replace?.(/\//g, "-");

export default getFormattedInputDateValue;
