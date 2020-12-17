import React from "react";
import PropTypes from "prop-types";

const goBackUp = (offsetTop) => {
  document.documentElement.scroll({ top: offsetTop, behavior: "smooth" });
};

export const EndMessageLayout = ({ offsetTop, onClick }) => (
  <p className="text-center">
    <button
      type="button"
      onClick={() => {
        goBackUp(offsetTop);
        onClick();
      }}
      className="btn btn-primary mt-2"
    >
      Volver arriba
    </button>
  </p>
);

EndMessageLayout.propTypes = {
  offsetTop: PropTypes.number,
  onClick: PropTypes.func
};

EndMessageLayout.defaultProps = {
  offsetTop: 0,
  onClick: () => {}
};
