import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { SearchInputLayout } from "../search-input";

const ModalSelect = ({
  buttonLabel,
  modalTitle,
  showSearch,
  searchPlaceholder,
  onSearchChange,
  options,
  footerButtonLabel,
  footerButtonOnClick,
  onInputChange,
  isChecked,
  multipleSelection,
  onModalClose,
  onModalOpen
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    onModalClose();
    setModalIsOpen(false);
  };

  const openModal = () => {
    onModalOpen();
    setModalIsOpen(true);
  };

  const onClickFooterButton = () => {
    footerButtonOnClick();
    closeModal();
  };

  return (
    <>
      <Button
        type="button"
        variant="light"
        className="ModalSelect__btn"
        onClick={openModal}
      >
        <span className="ModalSelect__btn-text">{buttonLabel}</span>
        <i className="fa fa-sort-down ModalSelect__btn-icon" />
      </Button>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        className="ModalSelect__modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSearch ? (
            <SearchInputLayout
              searchLabel={searchPlaceholder}
              onSearchChange={onSearchChange}
            />
          ) : null}
          <ul className={`options-list pl-2 mb-0 ${!showSearch ? "py-0" : ""}`}>
            {options &&
              options.map((option) => {
                const optionKey = `${buttonLabel}-${option.label}-${option.value}`;
                const inputType = multipleSelection ? "checkbox" : "radio";
                return (
                  <li className="options-list__item" key={optionKey}>
                    <div
                      className={`custom-control form-control-lg custom-${inputType}`}
                    >
                      <input
                        type={inputType}
                        className="custom-control-input"
                        id={optionKey}
                        name={multipleSelection ? optionKey : buttonLabel}
                        value={option.value}
                        onChange={onInputChange}
                        checked={isChecked(option.value)}
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
          <Button onClick={onClickFooterButton}>{footerButtonLabel}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalSelect.defaultProps = {
  buttonLabel: "",
  modalTitle: "",
  showSearch: true,
  searchPlaceholder: "Buscar",
  onSearchChange: () => {},
  options: [],
  footerButtonLabel: "",
  footerButtonOnClick: () => {},
  onInputChange: () => {},
  isChecked: () => {},
  multipleSelection: false,
  onModalClose: () => {},
  onModalOpen: () => {}
};

ModalSelect.propTypes = {
  buttonLabel: PropTypes.string,
  modalTitle: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  onSearchChange: PropTypes.func,
  options: PropTypes.array,
  footerButtonLabel: PropTypes.string || PropTypes.node,
  footerButtonOnClick: PropTypes.func,
  onInputChange: PropTypes.func,
  isChecked: PropTypes.func,
  multipleSelection: PropTypes.bool,
  onModalClose: PropTypes.func,
  onModalOpen: PropTypes.func
};

export { ModalSelect };
