import {
  updateSearchFilters,
  resetSearchFilters,
} from "react-app/src/state/ducks/search-filters/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

function searchFiltersSelector({ searchFilters }: RootState) {
  return searchFilters;
}

function useSearchFilters() {
  const searchFilters = useSelector(searchFiltersSelector);
  const dispatch = useDispatch();

  function update(...params: Parameters<typeof updateSearchFilters>) {
    dispatch(updateSearchFilters(...params));
  }

  function reset(...params: Parameters<typeof resetSearchFilters>) {
    dispatch(resetSearchFilters(...params));
  }

  return {
    searchFilters,
    updateSearchFilters: update,
    resetSearchFilters: reset,
  };
}

export default useSearchFilters;
