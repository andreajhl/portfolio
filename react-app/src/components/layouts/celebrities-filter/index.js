import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavbarSearchLayout } from "../navbar-search";
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
      onModalOpen={onModalOpen}
    >
      {showSearch ? (
        <NavbarSearchLayout searchLabel={searchPlaceholder} />
      ) : null}
      <ul className={`options-list pl-2 mb-0 ${!showSearch ? "py-0" : ""}`}>
        {options &&
          options.map((option) => {
            const optionKey = `${buttonLabel}-${option.label}-${option.value}`;
            return (
              <li className="options-list__item" key={optionKey}>
                <div className="custom-control form-control-lg custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={optionKey}
                    value={option.value}
                    onChange={addCheckedItem}
                    checked={checkedItems.includes(String(option.value))}
                  />
                  <label className="custom-control-label" htmlFor={optionKey}>
                    <span className="options-list__label">{option.label}</span>
                  </label>
                </div>
              </li>
            );
          })}
      </ul>
    </ModalSelect>
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
