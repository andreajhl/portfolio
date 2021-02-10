const limitString = (string, limit = 17) => {
  const newString = [];
  if (string.length < limit) return string;

  let characterCount = 0;
  const words = string.split(" ");
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const isInLimit = characterCount + word.length <= limit;
    if (!isInLimit) {
      break;
    }

    newString.push(word);
    characterCount += word.length;
  }

  return `${newString.join(" ")} ...`;
};

export default limitString;
