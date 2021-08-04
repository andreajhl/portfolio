import React from "react";
import { DownloadIcon } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
import { CSSProperties } from "react";

type DownloadVideoButtonProps = {
  videoURL?: string;
  backgroundColor?: CSSProperties["backgroundColor"];
  previewMode?: boolean;
};

function DownloadVideoButton({
  backgroundColor: backgroundColorFromProps,
  videoURL,
  previewMode = false,
}: DownloadVideoButtonProps) {
  const backgroundColor = backgroundColorFromProps || "white"; // Para evitar utilizar string vaciás.

  const buttonElement = (
    <button
      className={classes("btn btn-outline", styles.ActionButton)}
      style={{ backgroundColor }}
    >
      <DownloadIcon
        className={backgroundColor !== "white" ? styles.WhiteIcon : ""}
      />
    </button>
  );

  if (previewMode) return buttonElement;

  return (
    <a href={videoURL} target="_blank" rel="noopener noreferrer" download>
      {buttonElement}
    </a>
  );
}

export default DownloadVideoButton;
