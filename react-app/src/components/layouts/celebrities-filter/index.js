import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ModalSelect } from "../modal-select";
import "./styles.scss";

const CelebritiesFilter = ({
  buttonLabel,
  modalTitle,
  showSearch,
  searchPlaceholder,
  options,
  onApplyFilters,
  activeItems
}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const addCheckedItem = ({ target }) => {
    if (target.checked) {
      setCheckedItems((checkedItems) => [...checkedItems, target.value]);
    } else {
      setCheckedItems((checkedItems) =>
        checkedItems.filter((item) => item !== target.value)
      );
    }
  };

  const onModalOpen = () => setCheckedItems(activeItems);

  const applyFilters = () => {
    onApplyFilters(checkedItems);
  };

  useEffect(() => {
    setCheckedItems(activeItems);
  }, [activeItems]);

  return (
    <ModalSelect
      buttonLabel={`${buttonLabel} ${
        activeItems.length > 0 ? `(${activeItems.length})` : ""
      }`}
      modalTitle={modalTitle}
      footerButtonLabel="Aplicar filtro"
      footerButtonOnClick={applyFilters}
      searchPlaceholder={searchPlaceholder}
      onModalOpen={onModalOpen}
      options={options}
      showSearch={showSearch}
      onInputChange={addCheckedItem}
      isChecked={(optionValue) => checkedItems.includes(String(optionValue))}
      multipleSelection
    />
  );
};

CelebritiesFilter.defaultProps = {
  buttonLabel: "",
  modalTitle: "",
  activeItems: [],
  showSearch: true,
  searchPlaceholder: "Buscar",
  options: [],
  onApplyFilters: () => {}
};

const optionsPropType = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.string
});

CelebritiesFilter.propTypes = {
  buttonLabel: PropTypes.string,
  modalTitle: PropTypes.string,
  activeItems: PropTypes.array,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  options: PropTypes.arrayOf(optionsPropType),
  onApplyFilters: PropTypes.func
};

export { CelebritiesFilter };
