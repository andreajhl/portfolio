const getContractPrice = (
  contractTypes: { contractType: number; price: number }[]
): number => {
  const videoMessageContract = contractTypes.find(
    ({ contractType }) => contractType === 1
  );

  let videoMessagePrice = 0;
  if (videoMessageContract) {
    videoMessagePrice = videoMessageContract.price;
  }
  return videoMessagePrice;
};

export default getContractPrice;
