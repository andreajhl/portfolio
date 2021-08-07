import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { setAuthenticationEmail } from "react-app/src/state/ducks/session/actions";

const authenticationEmailSelector = ({ session }: RootState) =>
  session.setAuthenticationEmailReducer;

function useAuthenticationEmail() {
  const state = useSelector(authenticationEmailSelector);
  const dispatch = useDispatch();

  function setState(newValue: string) {
    dispatch(setAuthenticationEmail(newValue));
  }

  return [state, setState];
}

export default useAuthenticationEmail;
