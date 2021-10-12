import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export function FilterSectionModal({
  buttonLabel,
  modalTitle,
  children,
  footerButtonLabel,
  footerButtonOnClick,
  onModalClose,
  onModalOpen,
}) {
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
}
