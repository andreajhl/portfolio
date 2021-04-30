import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

function PhotoUploader() {
  return (
    <div className={styles.PhotoUploaderContainer}>
      <img
        className={styles.ImgPlaceholder}
        alt="Agrega una Foto"
        src={"/assets/img/user-logo.svg"}
      ></img>
      <button className={classes("btn", styles.CTAUploadPhoto)}>
        Agregar foto
      </button>
    </div>
  );
}

export default PhotoUploader;
