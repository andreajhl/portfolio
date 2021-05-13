import React from "react";
import { DownloadIcon } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
type DownloadVideoButtonProps = {
  videoURL?: string;
};

function DownloadVideoButton({ videoURL }: DownloadVideoButtonProps) {
  return (
    <a href={videoURL} target="_blank" rel="noopener noreferrer" download>
      <button className={classes("btn btn-outline", styles.ActionButton)}>
        <DownloadIcon />
      </button>
    </a>
  );
}

export default DownloadVideoButton;
