
import { ModalSelect } from "react-app/src/components/layouts/modal-select";
import * as GTM from "react-app/src/state/utils/gtm.js";
import getWindow from "react-app/src/utils/getWindow.js";
import { useIntl, defineMessage} from "react-intl";
import { FormattedMessage } from "react-intl";
import {useState, useEffect } from "react";

const messageForLabelButtonCategoryDeliveryTime = defineMessage({
    description: "buttonLabel search by Delivery time",
    defaultMessage: "Tiempo de Entrega",
});

const deliveryTimeFilter = [
    { label:defineMessage({defaultMessage: "Entrega Flash 24 hrs" }), value: "flash" },
    { label: defineMessage({defaultMessage:"< 3 días" }), value: 3 },
    { label: defineMessage({defaultMessage:"< 5 días"}), value: 5 },
    { label:defineMessage({defaultMessage: "7 días"}), value: 7 },
  ];
  

type filterCountriesProps={
    setFilterByDeliveryTimeParam:(paramName: string) => void,
    queryParams:any
}

const getCheckItemLabel = (activeValue) =>
  deliveryTimeFilter.find(({ value }) => value === activeValue)
    ?.label || "";

export const FilterSeccionDeliveryTime = ({setFilterByDeliveryTimeParam,queryParams}:filterCountriesProps) => {

    const [checkedValue, setCheckedValue] = useState('');
    const intl = useIntl();
  
    const checkItemLabel = getCheckItemLabel(queryParams);
  
    useEffect(() => {
      setCheckedValue(queryParams);
    }, [queryParams]);
  
    const analyticsData = {
      widget: "CelebritiesFilter",
      path: getWindow().location.pathname,
      checkItemLabel,
    };
  
    const onModalOpen = () =>{
      GTM.tagManagerDataLayer("OPEN_CELEBRITIES_FILTER_MODAL", analyticsData)
    }
    const onModalClose = () =>{
      GTM.tagManagerDataLayer("CLOSE_CELEBRITIES_FILTER_MODAL", analyticsData);
    }
  
    const applyFilters = () => {
      GTM.tagManagerDataLayer("APPLY_CELEBRITIES_FILTER", {
        ...analyticsData,
        checkItemLabel: getCheckItemLabel(checkedValue),
      });
      setFilterByDeliveryTimeParam(checkedValue);
    };
  
    return (
        <ModalSelect
            buttonLabel={intl.formatMessage(messageForLabelButtonCategoryDeliveryTime)}
            modalTitle={intl.formatMessage(messageForLabelButtonCategoryDeliveryTime)}
            footerButtonLabel={<FormattedMessage defaultMessage="Aplicar filtro" />}
            footerButtonOnClick={applyFilters}
            onModalOpen={onModalOpen}
            onModalClose={onModalClose}
            options={deliveryTimeFilter.map(e=>({label:intl.formatMessage(e.label), value:e.value}))}
            showSearch={false}
            onInputChange={({ target }) => setCheckedValue(target.value)}
    />

    )
}

