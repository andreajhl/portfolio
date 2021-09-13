import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";

export function useCelebrityHasPublicContracts() {
  return useSelector(
    (state: RootState) =>
      state.celebrities.fetchPublicContractsReducer?.data?.results?.length > 0
  );
}
