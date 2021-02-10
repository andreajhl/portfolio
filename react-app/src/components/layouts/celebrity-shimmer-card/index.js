import React, { memo } from "react";
import PropTypes from "prop-types";

const CelebrityShimmerCardLayout = ({ className }) => {
  return (
    <div className={`CelebrityShimmerCardLayout ${className}`}>
      <div className="shimmer-card">
        <div className="shimmerBG mr-0">
          <div className="line price-line"></div>
        </div>
        <div className="card-details">
          <div className="celebrity-info mb-1">
            <div className="line flag-line" />
            <div className="line w-25" />
            <img src="/assets/img/outlined-heart.svg" className="heart-icon" />
          </div>
          <div className="line w-100 celebrity-name" />
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
