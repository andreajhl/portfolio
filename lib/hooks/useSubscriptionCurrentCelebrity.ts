import { setCurrentCelebrity } from "react-app/src/state/ducks/subscriptions/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

function currentCelebritySelector({ subscriptions }: RootState) {
  return subscriptions.currentCelebrityReducer;
}

function useSubscriptionCurrentCelebrity() {
  const currentCelebrity = useSelector(currentCelebritySelector);
  const dispatch = useDispatch();

  function setCurrentCelebrityDispatch(newCurrentCelebrity: any) {
    dispatch(setCurrentCelebrity(newCurrentCelebrity));
  }

  return [currentCelebrity, setCurrentCelebrityDispatch] as const;
}

export default useSubscriptionCurrentCelebrity;
