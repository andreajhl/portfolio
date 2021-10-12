export const rankValueGraphi = (
  rank: { price: number; percentage: number }[]
) => {
  let newArray = [];
  for (let i = 0; i < 500; i++) {
    let obj = rank.find(({ price }) => price === i);
    obj ? newArray.push(obj) : newArray.push({ price: i, percentage: 0 });
  }
  return newArray;
};
