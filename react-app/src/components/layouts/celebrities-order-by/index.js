import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ModalSelect } from "../modal-select";
import { useIntl, defineMessage } from "react-intl";

import * as GTM from "../../../state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";

const PRICE = "price";
const ASC = "asc";
const DESC = "desc";

const orderByOptions = [
  { label: "Precio: De Menor a Mayor", value: `${PRICE} ${ASC}` },
  { label: "Precio: De Mayor a Menor", value: `${PRICE} ${DESC}` }
];

const messageForModalTitle = defineMessage({
  defaultMessage: "Ordenar por"
});
const messageForFooterButtonLabel = defineMessage({
  defaultMessage: "Ordenar"
});
const messageForButtonLabel = defineMessage({
  defaultMessage: "Ordenar por: {checkItemLabel}"
});
const getCheckItemLabel = (activeValue) =>
  orderByOptions.find(({ value }) => value !== "" && value === activeValue)
    ?.label || "";

const CelebritiesOrderBy = ({ onApplyOrderBy, activeValue }) => {
  const [checkedValue, setCheckedValue] = useState(null);
  const intl = useIntl();

  const checkItemLabel = getCheckItemLabel(activeValue);

  useEffect(() => {
    setCheckedValue(activeValue);
  }, [activeValue]);

  const analyticsData = {
    widget: "CelebritiesOrderBy",
    path: getWindow().location.pathname,
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
      buttonLabel={intl.formatMessage(messageForButtonLabel, {
        checkItemLabel: checkItemLabel
      })}
      modalTitle={intl.formatMessage(messageForModalTitle)}
      footerButtonLabel={intl.formatMessage(messageForFooterButtonLabel)}
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
