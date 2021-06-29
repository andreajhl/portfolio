import { toggleContractLikeFromList } from "react-app/src/state/ducks/account/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const userCelebrityLikesContractsWithReferenceSelector = ({
  account,
}: RootState) => account.fetchUserFavoritesContractsWithReferenceReducer.data;

function useUserLikesContractsWithReference() {
  const userContractsLikes = useSelector(
    userCelebrityLikesContractsWithReferenceSelector
  );
  const dispatch = useDispatch();

  function dispatchToggleContractLikeFromList(contract_reference: string) {
    dispatch(toggleContractLikeFromList(contract_reference));
  }

  return [
    userContractsLikes as {
      contractId: number;
      reference: string;
    }[],
    dispatchToggleContractLikeFromList,
  ] as const;
}

export default useUserLikesContractsWithReference;
