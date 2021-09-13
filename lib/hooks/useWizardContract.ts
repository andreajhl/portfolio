import ContractInProgressType from "desktop-app/types/contractInProgressType";
import { setWizardContract as setWizardContractActionCreator } from "react-app/src/state/ducks/contracts/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

type WizardContractType = {
  [Property in keyof ContractInProgressType]?: ContractInProgressType[Property];
};

function wizardContractSelector({ contracts }: RootState) {
  return contracts.wizardContractReducer as WizardContractType;
}

function useWizardContract() {
  const wizardContract = useSelector(wizardContractSelector);
  const dispatch = useDispatch();

  function setWizardContract(wizardContract: WizardContractType) {
    dispatch(setWizardContractActionCreator(wizardContract));
  }

  return [wizardContract, setWizardContract] as const;
}

export default useWizardContract;
