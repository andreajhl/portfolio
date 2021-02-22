import React, { memo } from "react";
import PropTypes from "prop-types";

const LoadingOverlay = ({ isLoading }) => {
  return (
    <div
      className={`loading-container mx-auto ${isLoading ? " on " : " off "}`}
    >
      <div className="stage">
        <img
          src="https://v.fastcdn.co/u/054523e2/48208445-0-FAMOSOS-favicon.png"
          width="100%"
        />
      </div>
    </div>
  );
};

LoadingOverlay.defaultProps = {
  isLoading: true
};

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool
};

const memoizedLoadingOverlay = memo(LoadingOverlay);
export { memoizedLoadingOverlay as LoadingOverlay };
