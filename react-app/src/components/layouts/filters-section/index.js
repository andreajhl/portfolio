import React from "react";
import "./styles.scss";
import { CelebritiesFilter } from "../celebrities-filter";

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
