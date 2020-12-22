import * as PropTypes from "prop-types";

const PaginationShape = PropTypes.shape({
    totalItems: PropTypes.number,
    totalItemsOnPage: PropTypes.number,
    totalPages: PropTypes.number,
    previousPage: PropTypes.number,
    currentPage: PropTypes.number,
    nextPage: PropTypes.number,
});

export {PaginationShape}
