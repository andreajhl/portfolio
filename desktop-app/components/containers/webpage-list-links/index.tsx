import { Link } from "desktop-app/components/common/routing/link";
import React from "react";
import styles from "./styles.module.scss";
const WebPageListLinks = () => {
  return (
    <ul className={styles.WebPageListLinks}>
      <li>
        <Link href="/docs/faqs">Preguntas Frecuentes</Link>
      </li>
      <li>
        <Link href="/docs/terminos">Términos y Condiciones</Link>
      </li>
      <li>
        <Link href="/docs/policies">Política y Privacidad</Link>
      </li>
      <li>
        <Link href="/">Ayuda</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/">Prensa</Link>
      </li>
    </ul>
  );
};

export default WebPageListLinks;
