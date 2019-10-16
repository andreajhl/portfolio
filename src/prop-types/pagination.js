import PropTypes from "prop-types";

const { number, shape, string, arrayOf } = PropTypes;

const PaginationShape = shape({
    totalItems: number,
    totalItemsOnPage: number,
    totalPages: number,
    previousPage: string,
    currentPage: number,
    nextPage: string,
});

export {PaginationShape}
