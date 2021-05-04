const getArrayOfLength = (length: number): null[] =>
  length > 0 ? new Array(length).fill(null) : [];

export default getArrayOfLength;
