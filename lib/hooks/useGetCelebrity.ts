import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { celebrityType } from "desktop-app/types/celebrityType";

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  celebrity: celebrityType;
  status: StatusType;
};

const celebritySelector = ({
  celebrities: { getCelebrityReducer },
}: RootState) => {
  let status: StatusType = "loading";
  if (getCelebrityReducer.failed) status = "failed";
  if (getCelebrityReducer.completed) status = "completed";

  const state: StateType = {
    celebrity: getCelebrityReducer.data,
    status,
  };

  return state;
};

function useGetCelebrity() {
  const state = useSelector(celebritySelector);
  return state;
}

export default useGetCelebrity;
