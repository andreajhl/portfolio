import React, { memo } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const CelebrityShimmerCardLayout = ({ className }) => {
  return (
    <div className={`CelebrityShimmerCardLayout ${className}`}>
      <div></div>
      <div className="shimmer-card f-card f-rounded hover f-shadow p-2 pt-0 cursor-pointer text-center mx-auto">
        <div className="mx-auto">
          <div className="shimmerBG mr-0" />
          <div className="mt-3">
            <div className="title-line mt-2" />
            <div className="title-line mt-2" />
            <div className="title-line mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

CelebrityShimmerCardLayout.defaultProps = {
  className: ""
};

CelebrityShimmerCardLayout.propTypes = {
  className: PropTypes.string
};

const memoizedCelebrityShimmerCardLayout = memo(CelebrityShimmerCardLayout);
export { memoizedCelebrityShimmerCardLayout as CelebrityShimmerCardLayout };
