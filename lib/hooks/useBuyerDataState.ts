import { BuyerDataType } from "desktop-app/types/payment-methods";
import { RootState } from "react-app/src/state/store";
import { useSelector } from "react-redux";

function buyerDataSelector({ payments }: RootState) {
  return payments.buyerData as BuyerDataType;
}

function useBuyerDataState() {
  const buyerDataState = useSelector(buyerDataSelector);
  return buyerDataState;
}

export default useBuyerDataState;
