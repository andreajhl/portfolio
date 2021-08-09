import { useEffect } from "react";
import { getHiringPreviewConfiguration } from "react-app/src/state/ducks/contracts/actions";
import { useDispatch, useSelector } from "react-redux";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { RootState } from "react-app/src/state/store";

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  hiringPreviewConfiguration: HiringPreviewConfigurationType;
  status: StatusType;
};

// Para renombrar las propiedades que responde el endpoint. TODO: Renombrar en el type.
function getData(data) {
  return {
    ...data,
    cardTitle: data.previewTitle,
    cardMessage: data.previewMessage,
    cardColor: data.previewCardColor,
    pageBackgroundUrl: data.previewBackgroundUrl,
    actionButtonsBackgroundColor: data.previewButtonsBackgroundColor
  } as HiringPreviewConfigurationType;
}

function hiringPreviewSelector({
                                 contracts: { getHiringPreviewConfigurationReducer }
                               }: RootState) {
  let status: StatusType = "loading";
  if (getHiringPreviewConfigurationReducer.failed) status = "failed";
  if (getHiringPreviewConfigurationReducer.completed) status = "completed";

  const state: StateType = {
    hiringPreviewConfiguration: getData(
      getHiringPreviewConfigurationReducer.data
    ),
    status
  };

  return state;
}

function useGetHiringPreviewConfiguration(contractReference: string) {
  const state = useSelector(hiringPreviewSelector);
  const dispatch = useDispatch();

  const isSameContract =
    state?.hiringPreviewConfiguration?.contractReference === contractReference;

  useEffect(() => {
    if (!contractReference || isSameContract) {
      return;
    }
    dispatch(getHiringPreviewConfiguration(contractReference));
  }, [isSameContract, contractReference, dispatch]);

  return state;
}

export default useGetHiringPreviewConfiguration;
