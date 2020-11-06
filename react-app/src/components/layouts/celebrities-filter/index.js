import React, { useState } from "react";
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
  onApplyFilters
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  const [checkedItems, setCheckedItems] = useState([]);

  const addCheckedItem = ({ target }) => {
    setCheckedItems((checkedItems) => [...checkedItems, target.value]);
  };

  const applyFilters = () => {
    onApplyFilters(checkedItems);
    closeModal();
  };

  console.log(checkedItems);

  return (
    <>
      <Button
        type="button"
        variant="light"
        className="CelebritiesFilter__btn"
        onClick={openModal}
      >
        <span className="CelebritiesFilter__btn-text">
          {label} {checkedItems.length > 0 ? `(${checkedItems.length})` : ""}
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
          <ul
            className={`options-list pl-2 mb-0 ${!showSearch ? "py-0" : ""}`}
            onChange={addCheckedItem}
          >
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

CelebritiesFilter.defaultProps = { showSearch: true };

export { CelebritiesFilter };
