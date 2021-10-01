import { parseFullName } from "parse-full-name";

const allowedShortFirstNames = ["Mark", "Maia"];

export const getFirstName = (celebrityFullName) => {
  if (typeof celebrityFullName !== "string") return "";
  const parsedFullName = parseFullName(
    celebrityFullName,
    "all",
    true,
    false,
    true
  );

  const firstName = parsedFullName.first || parsedFullName.last;
  if (allowedShortFirstNames.includes(firstName)) {
    return firstName;
  }

  const fullNameWords = celebrityFullName.split(" ");

  return firstName.length <= 4
    ? fullNameWords.slice(0, 2).join(" ")
    : firstName;
};
