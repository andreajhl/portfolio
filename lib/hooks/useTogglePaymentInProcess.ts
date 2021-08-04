import React from "react";
import { togglePaymentInProcess } from "react-app/src/state/ducks/payments/actions";
import { useDispatch } from "react-redux";

function useTogglePaymentInProcess() {
  const dispatch = useDispatch();

  return () => dispatch(togglePaymentInProcess());
}

export default useTogglePaymentInProcess;
