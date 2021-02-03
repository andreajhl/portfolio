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
      <div className='d-flex'>
        <span className='text-justify'>{text}</span>
        <div>
          <button
            style={{ backgroundColor: "#00e676" }}
            className='btn btn-outline-none ml-4'
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
