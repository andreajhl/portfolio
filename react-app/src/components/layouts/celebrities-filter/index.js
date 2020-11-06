import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavbarSearchLayout } from "../navbar-search";

const CelebritiesFilter = ({ label, modalTitle, searchLabel, options }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  const [checkedItems, setCheckedItems] = useState([]);

  const addCheckedItem = ({ target }) => {
    setCheckedItems((checkedItems) => [...checkedItems, target.value]);
  };

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
          <NavbarSearchLayout searchLabel={searchLabel} />
          <ul className="options-list pl-2 mb-0" onChange={addCheckedItem}>
            {options &&
              options.map((option, index) => (
                <li className="options-list__item">
                  <div class="custom-control form-control-lg custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id={`customCheck-${index}`}
                    />
                    <label
                      class="custom-control-label"
                      for={`customCheck-${index}`}
                    >
                      <span className="options-list__label">México</span>
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Aplicar filtro</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { CelebritiesFilter };
