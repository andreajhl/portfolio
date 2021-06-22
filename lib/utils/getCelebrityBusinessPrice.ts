const BUSINESS_CONTRACT_TYPE = 2; /* Por ser definido correctamente */

const getCelebrityBusinessPrice = (contractsTypes: any[]) =>
  contractsTypes?.find?.(
    (contract) => contract.contractType === BUSINESS_CONTRACT_TYPE
  )?.price || 0;

export default getCelebrityBusinessPrice;
