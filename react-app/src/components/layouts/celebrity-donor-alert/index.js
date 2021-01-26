import React from "react";
import "./styles.scss";

export const CelebrityDonorAlert = ({
  className = "",
  fullName,
  causeName
}) => {
  return (
    <div
      className={`CelebrityDonorAlert d-flex align-items-center justify-content-center py-3 px-3 px-xl-5 ${className}`}
    >
      <div className="CelebrityDonorAlert__image-side mr-3">
        <img
          src="assets/img/charity-icon.svg"
          alt="Caridad"
          className="CelebrityDonorAlert__image"
        />
      </div>
      <div className="text-center">
        <p className="m-0 CelebrityDonorAlert__text">
          {fullName} dona de sus ingresos a: <br /> {causeName}
        </p>
      </div>
    </div>
  );
};
