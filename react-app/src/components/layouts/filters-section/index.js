import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.scss";

const CelebritiesFilter = ({ label, modalTitle }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <>
      <Button
        type="button"
        variant="light"
        className="CelebritiesFilter__btn"
        onClick={openModal}
      >
        <span className="CelebritiesFilter__btn-text">{label}</span>
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
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Aplicar filtro</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const FiltersSectionLayout = () => {
  return (
    <section className="FiltersSectionLayout">
      <div className="filters-section__container container pt-2 pb-1">
        <h2 className="filters-section__title ml-2">Filtrar por:</h2>
        <ul className="filters-section__filters-list p-0">
          <li className="filters-section__filters-item">
            <CelebritiesFilter label="País" modalTitle="Filtrar por país" />
          </li>
          <li className="filters-section__filters-item">
            <CelebritiesFilter label="Categoría" />
          </li>
          <li className="filters-section__filters-item">
            <CelebritiesFilter label="Precio" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export { FiltersSectionLayout };
