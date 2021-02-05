import React, { FunctionComponent } from "react";

type WhatsappContactProps = {
  numberPhone: number;
  text: Node;
  placeHolderMessage: string;
};

export const WhatsappContact: FunctionComponent<WhatsappContactProps> = ({
  numberPhone,
  text,
  placeHolderMessage
}) => {
  return (
    <React.Fragment>
      <div className='d-flex flex-column'>
        <div className='mx-auto' style={{ width: "80%" }}>
          <span
            className='text-justify'
            style={{ color: "#505050", fontSize: "16px" }}
          >
            {text}
          </span>
        </div>
        <div className='mx-auto' style={{ width: "80%" }}>
          <button
            style={{ backgroundColor: "#1BD741" }}
            className='btn btn-outline-none mt-3 w-100'
          >
            <a
              href={
                placeHolderMessage
                  ? `https://wa.me/${numberPhone}?text=${encodeURIComponent(
                      placeHolderMessage
                    )}`
                  : `https://wa.me/${numberPhone}`
              }
              target='_blank'
            >
              <i
                className='fab fa-whatsapp'
                style={{
                  color: "white",
                  fontSize: "32px"
                }}
              ></i>
            </a>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
