import Popup from "reactjs-popup";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
const contentStyle = {
  background: "rgb(248,248,248)",
  borderRadius: "10px",
};
const overlayStyle = { background: "rgba(0,0,0,0.5)" };

export type AuthenticationFailurePopupProps = {
  errorMessage: string;
};

function AuthenticationFailurePopup({
  errorMessage,
}: AuthenticationFailurePopupProps) {
  const [open, setOpen] = useState(true);

  const closeModal = () => setOpen(false);
  return (
    <Popup
      open={open}
      contentStyle={{
        ...contentStyle,
      }}
      overlayStyle={{ ...overlayStyle }}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "400px",
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          alignItems: "center",
          padding: "32px",
        }}
      >
        <button
          style={{
            position: "absolute",
            left: "100%",
            top: "0%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
          }}
          className="close"
          onClick={closeModal}
        >
          &times;
        </button>
        <p>
          <FormattedMessage defaultMessage="Autenticación Fallida" />
        </p>
        <p className="text-danger">{errorMessage}</p>
      </div>
    </Popup>
  );
}

export { AuthenticationFailurePopup };
