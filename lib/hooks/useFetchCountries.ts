import { useEffect } from "react";
import { restCountriesOperations } from "react-app/src/state/ducks/rest-countries";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const countrieStateSelector = ({
  restCountries: { fetchCountriesReducer },
}: RootState) => fetchCountriesReducer;

function useFetchCountries() {
  const dispatch = useDispatch();
  const { completed, loading } = useSelector(countrieStateSelector);
  useEffect(() => {
    if (!loading && !completed) {
      dispatch(restCountriesOperations.list());
    }
  }, []);
}

export { useFetchCountries };
