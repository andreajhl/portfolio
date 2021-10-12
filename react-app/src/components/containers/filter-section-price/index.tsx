import { FilterSectionModal } from "react-app/src/components/containers/filter-section-modal";
import { PriceRangeSlider } from "react-app/src/components/containers/filter-range-slider";
import * as GTM from "react-app/src/state/utils/gtm.js";
import getWindow from "react-app/src/utils/getWindow.js";
import { useIntl, defineMessage } from "react-intl";
import { FormattedMessage } from "react-intl";
import { useState } from "react";

const messageForLabelButtonCategoryPrice = defineMessage({
  description: "buttonLabel search by Price",
  defaultMessage: "Precios",
});

const defaultMinPrice = 5;
const defaultMaxPrice = 500;
const priceRangeSliderInitialValues = [defaultMinPrice, defaultMaxPrice];

type filterCountriesProps = {
  setFilterPrice: (paramName: any) => void;
};

export const FilterSectionPrice = ({
  setFilterPrice,
}: filterCountriesProps) => {
  const intl = useIntl();
  const [priceRangeIsTouched, setPriceRangeIsTouched] = useState(false);
  const [priceRangeValues, setPriceRangeValues] = useState(
    priceRangeSliderInitialValues
  );

  const analyticsData = {
    widget: "CelebritiesFilter",
    path: getWindow().location.pathname,
    min_price: priceRangeValues[0],
    max_price: priceRangeValues[1],
  };

  const onModalOpen = () => {
    GTM.tagManagerDataLayer("OPEN_CELEBRITIES_FILTER_MODAL", analyticsData);
  };
  const onModalClose = () => {
    GTM.tagManagerDataLayer("CLOSE_CELEBRITIES_FILTER_MODAL", analyticsData);
  };

  const applyFilters = () => {
    GTM.tagManagerDataLayer("APPLY_CELEBRITIES_FILTER", analyticsData);
    setFilterPrice(priceRangeValues);
  };

  function updateSearchFilterPriceRange({
    values: [min_price, max_price],
  }: {
    values: [any, any];
  }): void {
    if (
      max_price !== priceRangeSliderInitialValues[1] &&
      min_price !== priceRangeSliderInitialValues
    ) {
      setPriceRangeValues([min_price, max_price]);
    }
  }

  function changeIsTouched() {
    if (!priceRangeIsTouched) setPriceRangeIsTouched(true);
  }

  return (
    <FilterSectionModal
      buttonLabel={intl.formatMessage(messageForLabelButtonCategoryPrice)}
      modalTitle={intl.formatMessage(messageForLabelButtonCategoryPrice)}
      footerButtonLabel={<FormattedMessage defaultMessage="Aplicar filtro" />}
      footerButtonOnClick={applyFilters}
      onModalOpen={onModalOpen}
      onModalClose={onModalClose}
    >
      <PriceRangeSlider
        min={defaultMinPrice}
        max={defaultMaxPrice}
        values={priceRangeValues}
        isTouched={priceRangeIsTouched}
        changeIsTouched={changeIsTouched}
        setValues={setPriceRangeValues}
        onChange={updateSearchFilterPriceRange}
      />
    </FilterSectionModal>
  );
};
