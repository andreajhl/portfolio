import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavbarSearchLayout } from "../navbar-search";
import "./styles.scss";

const CelebritiesFilter = ({
  label,
  modalTitle,
  showSearch,
  searchLabel,
  options,
  onApplyFilters,
  activeItems
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => {
    setCheckedItems(activeItems);
    setModalIsOpen(true);
  };

  const addCheckedItem = ({ target }) => {
    if (target.checked) {
      setCheckedItems((checkedItems) => [...checkedItems, target.value]);
    } else {
      setCheckedItems((checkedItems) =>
        checkedItems.filter((item) => item !== target.value)
      );
    }
  };

  const applyFilters = () => {
    onApplyFilters(checkedItems);
    closeModal();
  };

  useEffect(() => {
    setCheckedItems(activeItems);
  }, [activeItems]);

  return (
    <>
      <Button
        type="button"
        variant="light"
        className="CelebritiesFilter__btn"
        onClick={openModal}
      >
        <span className="CelebritiesFilter__btn-text">
          {label} {activeItems.length > 0 ? `(${activeItems.length})` : ""}
        </span>
        <i className="fa fa-sort-down CelebritiesFilter__btn-icon" />
      </Button>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        className="CelebritiesFilter__modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSearch ? <NavbarSearchLayout searchLabel={searchLabel} /> : null}
          <ul className={`options-list pl-2 mb-0 ${!showSearch ? "py-0" : ""}`}>
            {options &&
              options.map((option) => {
                const optionKey = `${label}-${option.label}-${option.value}`;
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
                      <label
                        className="custom-control-label"
                        htmlFor={optionKey}
                      >
                        <span className="options-list__label">
                          {option.label}
                        </span>
                      </label>
                    </div>
                  </li>
                );
              })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={applyFilters}>Aplicar filtro</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

CelebritiesFilter.defaultProps = { showSearch: true, activeItems: [] };

export { CelebritiesFilter };
