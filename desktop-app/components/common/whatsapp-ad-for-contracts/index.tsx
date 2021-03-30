import React from "react";
import SubmitButton from "../button/submit-button";
import styles from "./styles.module.scss";
const numberPhone = 18559107580;
type WhatsapAdForContractsProps = {
  celebrityFullName: string;
};

const WhatsapAdForContracts = ({
  celebrityFullName
}: WhatsapAdForContractsProps) => {
  return (
    <div className={styles.WhatsapAdForContracts}>
      <a
        href={`https://wa.me/${numberPhone}?text=${encodeURIComponent(
          celebrityFullName
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="Whatsapp Icono"
          width="47px"
          height="51px"
          src="/assets/img/whatsapp-icon.png"
        ></img>
      </a>
      <span>
        Te redirigiremos a Whatsapp donde uno de nuestros agentes te atenderá
        para continuar con el proceso.
      </span>

      <SubmitButton
        onClick={() =>
          window.open(
            `https://wa.me/${numberPhone}?text=${encodeURIComponent(
              celebrityFullName
            )}`,
            "_blank"
          )
        }
      >
        Continuar
      </SubmitButton>
    </div>
  );
};

export default WhatsapAdForContracts;
