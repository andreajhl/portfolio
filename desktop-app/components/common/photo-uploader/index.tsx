import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  imgAlt: {
    defaultMessage: "Agrega una foto",
  },
});

function PhotoUploader() {
  const { formatMessage } = useIntl();
  const imgAlt = formatMessage(messages.imgAlt);

  return (
    <div className={styles.PhotoUploaderContainer}>
      <img
        className={styles.ImgPlaceholder}
        alt={imgAlt}
        src={"/assets/img/user-logo.svg"}
      />
      <button className={classes("btn", styles.CTAUploadPhoto)}>
        <FormattedMessage defaultMessage="Agregar foto" />
      </button>
    </div>
  );
}

export default PhotoUploader;
