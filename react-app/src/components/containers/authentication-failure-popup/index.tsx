import Popup from "reactjs-popup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const contentStyle = {
  background: "rgb(248,248,248)",
  borderRadius: "10px"
};
const overlayStyle = { background: "rgba(0,0,0,0.5)" };

function AuthenticationFailurePopup() {
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  useEffect(() => {
    if (query.error) {
      setOpen(true);
    }
  }, [query]);
  const closeModal = () => setOpen(false);
  return (
    <Popup
      open={open}
      contentStyle={{
        ...contentStyle
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
          padding: "32px"
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
            height: "30px"
          }}
          className="close"
          onClick={closeModal}
        >
          &times;
        </button>
        <p>Autenticación Fallida</p>
        <p className="text-danger">{query.error}</p>
      </div>
    </Popup>
  );
}

export { AuthenticationFailurePopup };
