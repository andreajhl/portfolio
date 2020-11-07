import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./styles.scss";

const ModalSelect = ({
  buttonLabel,
  modalTitle,
  children,
  footerButtonLabel,
  footerButtonOnClick,
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
        <Modal.Body>{children}</Modal.Body>
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
  children: null,
  footerButtonLabel: "",
  footerButtonOnClick: () => {},
  onModalClose: () => {},
  onModalOpen: () => {}
};

ModalSelect.propTypes = {
  buttonLabel: PropTypes.string,
  modalTitle: PropTypes.string,
  children: PropTypes.node,
  footerButtonLabel: PropTypes.string,
  footerButtonOnClick: PropTypes.func,
  onModalClose: PropTypes.func,
  onModalOpen: PropTypes.func
};

export { ModalSelect };
