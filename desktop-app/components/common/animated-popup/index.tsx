import Popup from "reactjs-popup";
import { PopupProps } from "reactjs-popup/dist/types";

type AnimatedPopupProps = { animation?: "anvil" } & PopupProps;
const overlayStyle = { background: "rgba(0,0,0,0.5)" };

function AnimatedPopup({ animation = "anvil", ...props }: AnimatedPopupProps) {
  return (
    <Popup
      contentStyle={{
        animation: `${animation} 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards`
      }}
      overlayStyle={overlayStyle}
      {...props}
    />
  );
}

export { AnimatedPopup };
