import React from "react";

const goBackUp = (offsetTop) => {
  document.documentElement.scroll({ top: offsetTop, behavior: "smooth" });
};

export const EndMessageLayout = ({ offsetTop }) => (
  <p className="text-center">
    <button
      type="button"
      onClick={() => goBackUp(offsetTop)}
      className="btn btn-primary mt-2"
    >
      Volver arriba
    </button>
  </p>
);
