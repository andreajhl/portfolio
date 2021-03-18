import React from "react";
import styles from "./styles.module.scss";
const WebPageListLinks = () => {
  return (
    <ul className={styles.WebPageListLinks}>
      <li>Preguntas Frecuentes</li>
      <li>Términos y Condiciones</li>
      <li>Política y Privacidad</li>
      <li>Ayuda</li>
      <li>Blog</li>
      <li>Prensa</li>
    </ul>
  );
};

export default WebPageListLinks;
