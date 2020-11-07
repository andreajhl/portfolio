import React, { useState, useEffect, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
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
  const onModalClose = () => setSearchQuery("");

  const applyFilters = () => {
    onApplyFilters(checkedItems);
  };

  useEffect(() => {
    setCheckedItems(activeItems);
  }, [activeItems]);

  const matchSearchQuery = ({ label }) =>
    new RegExp(searchQuery, "gi").test(label);

  const filteredOptions = searchQuery
    ? options.filter(matchSearchQuery)
    : options;

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
      onModalClose={onModalClose}
      options={filteredOptions}
      showSearch={showSearch}
      onInputChange={addCheckedItem}
      onSearchChange={setSearchQuery}
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
