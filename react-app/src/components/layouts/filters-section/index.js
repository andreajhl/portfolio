import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.scss";
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

const FiltersSectionLayout = () => {
  return (
    <section className="FiltersSectionLayout">
      <div className="filters-section__container container pt-2">
        <h2 className="filters-section__title ml-2">Filtrar por:</h2>
        <ul className="filters-section__filters-list p-0">
          <li className="filters-section__filters-item">
            <CelebritiesFilter
              label="País"
              modalTitle="Filtrar por país"
              searchLabel="Buscar país"
              options={Array(20).fill({ label: "México", value: "mx" }, 0, 20)}
            />
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
