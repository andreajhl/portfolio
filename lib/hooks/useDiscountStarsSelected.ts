import { setDiscountStarsSelected } from "react-app/src/state/ducks/payments/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const starSelectedSelector = (state: RootState) =>
  state.payments.discountStarsSelected ?? 0;

function useDiscountStarsSelected() {
  const starsSelected = useSelector(starSelectedSelector);
  const dispatch = useDispatch();

  function setStarsSelected(
    starSelected: number | ((previousState: number) => number)
  ) {
    dispatch(setDiscountStarsSelected(starSelected));
  }

  return [starsSelected, setStarsSelected] as const;
}

export default useDiscountStarsSelected;
