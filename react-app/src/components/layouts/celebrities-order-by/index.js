import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ModalSelect } from "../modal-select";

import * as GTM from "../../../state/utils/gtm";

const PRICE = "price";
const ASC = "asc";
const DESC = "desc";

const orderByOptions = [
  { label: "Precio: De Menor a Mayor", value: `${PRICE} ${ASC}` },
  { label: "Precio: De Mayor a Menor", value: `${PRICE} ${DESC}` }
];

const getCheckItemLabel = (activeValue) =>
  orderByOptions.find(({ value }) => value !== "" && value === activeValue)
    ?.label || "";

const CelebritiesOrderBy = ({ onApplyOrderBy, activeValue }) => {
  const [checkedValue, setCheckedValue] = useState(null);

  const checkItemLabel = getCheckItemLabel(activeValue);

  useEffect(() => {
    setCheckedValue(activeValue);
  }, [activeValue]);

  const analyticsData = {
    widget: "CelebritiesOrderBy",
    path: window.location.pathname,
    checkItemLabel
  };

  const registerOrderByFilterOpen = () =>
    GTM.tagManagerDataLayer("OPEN_ORDER_BY_FILTER_MODAL", analyticsData);

  const registerOrderByFilterClose = () =>
    GTM.tagManagerDataLayer("CLOSE_ORDER_BY_FILTER_MODAL", analyticsData);

  const applyOrderBy = () => {
    GTM.tagManagerDataLayer("APPLY_ORDER_BY_FILTER", {
      ...analyticsData,
      checkItemLabel: getCheckItemLabel(checkedValue)
    });
    onApplyOrderBy(checkedValue);
  };

  return (
    <ModalSelect
      buttonLabel={`Ordenar por: ${checkItemLabel}`}
      modalTitle="Ordenar por"
      footerButtonLabel="Ordenar"
      footerButtonOnClick={applyOrderBy}
      onModalOpen={registerOrderByFilterOpen}
      onModalClose={registerOrderByFilterClose}
      options={orderByOptions}
      showSearch={false}
      onInputChange={({ target }) => setCheckedValue(target.value)}
      isChecked={(optionValue) => checkedValue === optionValue}
    />
  );
};

CelebritiesOrderBy.defaultProps = {
  activeValue: "",
  onApplyOrderBy: () => {}
};

CelebritiesOrderBy.propTypes = {
  activeValue: PropTypes.string,
  onApplyOrderBy: PropTypes.func
};

export { CelebritiesOrderBy };
