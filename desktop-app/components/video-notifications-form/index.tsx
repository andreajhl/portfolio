import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.scss";
const VideoNotificationForm = () => {
  const [numberPhoneRaw, setNumberPhoneRaw] = useState("");
  const [dialCode, setDialCode] = useState("");
  useEffect(() => {
    console.log(numberPhoneRaw);
    console.log(dialCode);
  }, [numberPhoneRaw, setNumberPhoneRaw, dialCode, setDialCode]);
  return (
    <div>
      <h2>¡Este video quedará genial! Te notificaremos cuando esté listo.</h2>
      <h3>Correo electrónico de notificación</h3>
      <input type="text"></input>
      <h3>Notificarme también por Whatsapp (opcional)</h3>
      <PhoneInput
        isValid={(value, country) => {
          const valueWithPlusOperator = `+${value}`;
          if (
            valueWithPlusOperator.match(
              /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
            )
          ) {
            return true;
          } else {
            return "Ingresa un número de teléfono válido";
          }
        }}
        containerClass={styles.ContainerPhoneInput}
        inputClass={styles.InputClassPhoneInput}
        buttonClass={styles.ButtonClassPhoneInput}
        dropdownClass={styles.DropdownClassPhoneInput}
        country={"co"}
        onChange={(value, data: any) => {
          setDialCode(data.dialCode);
          setNumberPhoneRaw(value.slice(data.dialCode.length));
        }}
      />
      <div>
        <span>Permitir que mi video sea público</span>
      </div>
    </div>
  );
};

export default VideoNotificationForm;
