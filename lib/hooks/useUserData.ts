import { userDetails } from "desktop-app/types/userDetails";
import {
  cleanUserData as cleanUser,
  getUserAccountDetails,
} from "react-app/src/state/ducks/session/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const userSelector = ({ session }: RootState): userDetails =>
  session.userAccountDetails.data;

function useUserData() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  function fetchUserData() {
    dispatch(getUserAccountDetails());
  }

  function cleanUserData() {
    dispatch(cleanUser());
  }

  return { user, fetchUserData, cleanUserData };
}

export default useUserData;
