import useGetContractToPayState from "./useGetContractToPayState";

function useContractHasCelebrityDiscount() {
  const { contractToPay } = useGetContractToPayState();
  return contractToPay.price !== contractToPay.original_price;
}

export default useContractHasCelebrityDiscount;
