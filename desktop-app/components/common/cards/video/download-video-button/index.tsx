import React from "react";
import { DownloadIcon } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
import { CSSProperties } from "react";

type DownloadVideoButtonProps = {
  videoURL?: string;
  backgroundColor?: CSSProperties["backgroundColor"];
};

function DownloadVideoButton({
  backgroundColor = "white",
  videoURL,
}: DownloadVideoButtonProps) {
  return (
    <a href={videoURL} target="_blank" rel="noopener noreferrer" download>
      <button
        className={classes("btn btn-outline", styles.ActionButton)}
        style={{ backgroundColor }}
      >
        <DownloadIcon
          className={backgroundColor !== "white" ? styles.WhiteIcon : ""}
        />
      </button>
    </a>
  );
}

export default DownloadVideoButton;
