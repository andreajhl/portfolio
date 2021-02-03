import * as TYPES from "./types";
import getLocationInfo from "../../utils/localizationApiService";
import {
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";

export const getCountryCode = () => (dispatch) => {
  const TYPE = TYPES.GET_COUNTRY_CODE_REQUEST;
  dispatch({ type: TYPE });
  getLocationInfo({ fields: "country_code" })
    .then((data) => handleApiResponseSuccess(dispatch, TYPE, data))
    .catch(() =>
      handleApiResponseFailure(dispatch, TYPE, {
        errorMessage: "There was an error getting the localization information."
      })
    )
    .finally(() => dispatch({ type: `${TYPE}_COMPLETED`, payload: {} }));
};
