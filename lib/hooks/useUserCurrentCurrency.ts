import { RootState } from "react-app/src/state/store";
import { useSelector } from "react-redux";

const currencyDataSelector = ({ payments }: RootState) =>
  payments.currencyExchangeReducer.data;

function useUserCurrentCurrency() {
  const currencyData = useSelector(currencyDataSelector);

  return currencyData.to;
}

export default useUserCurrentCurrency;
