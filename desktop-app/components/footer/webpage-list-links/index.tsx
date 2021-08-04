import { Link } from "desktop-app/components/common/routing/link";
import React from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

function trackJobListingLinkClick() {
  analytics.track("FOOTER_JOB_LISTING_LINK_CLICK", {
    widget: "WebPageListLinks",
    path: getWindow().location.pathname,
  });
}

function trackJobListingLinkHover() {
  analytics.track("FOOTER_JOB_LISTING_LINK_HOVER", {
    widget: "WebPageListLinks",
    path: getWindow().location.pathname,
  });
}

function WebPageListLinks() {
  return (
    <ul className={styles.WebPageListLinks}>
      <li>
        <Link href="/docs/faqs">
          <FormattedMessage defaultMessage="Preguntas Frecuentes" />
        </Link>
      </li>
      <li>
        <Link href="/docs/terminos">
          <FormattedMessage defaultMessage="Términos y Condiciones" />
        </Link>
      </li>
      <li>
        <Link href="/docs/politicas">
          <FormattedMessage defaultMessage="Política y Privacidad" />
        </Link>
      </li>

      <li>
        <Link href="/blog">
          <FormattedMessage defaultMessage="Blog" />
        </Link>
      </li>
      <li>
        <a
          href="https://jobs.lever.co/famosos"
          target="_blank"
          rel="noreferrer"
          onClick={trackJobListingLinkClick}
          onMouseOver={trackJobListingLinkHover}
        >
          <FormattedMessage defaultMessage="Trabaja con nosotros" />
        </a>
      </li>
    </ul>
  );
}

export default WebPageListLinks;
