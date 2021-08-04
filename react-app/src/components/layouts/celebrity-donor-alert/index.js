import React from "react";
import { FormattedMessage } from "react-intl";

export const CelebrityDonorAlert = ({
  className = "",
  fullName,
  causeName,
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
          <FormattedMessage
            defaultMessage="{fullName} dona de sus ingresos a: <span> {causeName} </span>"
            description=""
            values={{
              span: (str) => (
                <span className="CelebrityDonorAlert__cause-name text-with-ellipsis">
                  {str}
                </span>
              ),
              fullName: fullName,
              causeName: causeName,
            }}
          />
        </p>
      </div>
    </div>
  );
};
