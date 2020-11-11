import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ModalSelect } from "../modal-select";
import "./styles.scss";

const PRICE = "price";
const ASC = "asc";
const DESC = "desc";

const orderByOptions = [
  { label: "Precio: De Menor a Mayor", value: `${PRICE} ${ASC}` },
  { label: "Precio: De Mayor a Menor", value: `${PRICE} ${DESC}` }
];

const CelebritiesOrderBy = ({ onApplyOrderBy, activeValue }) => {
  const [checkedValue, setCheckedValue] = useState(null);

  const checkItemLabel =
    orderByOptions.find(({ value }) => value !== "" && value === activeValue)
      ?.label || "";

  useEffect(() => {
    setCheckedValue(activeValue);
  }, [activeValue]);

  return (
    <ModalSelect
      buttonLabel={`Ordenar por: ${checkItemLabel}`}
      modalTitle="Ordernar por"
      footerButtonLabel="Ordenar"
      footerButtonOnClick={() => onApplyOrderBy(checkedValue)}
      onModalOpen={() => {}}
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
