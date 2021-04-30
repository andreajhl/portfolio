import React from "react";
import { IconButton } from "desktop-app/components/common/button/icon-button";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AnimatedPopup } from "../animated-popup";

type TriggerPopupEditButtonProps = {
  label: string;
  value: string | number;
  popupContent: React.ReactNode;
  editButtonColor?;
};

function TriggerPopupEditButton({
  label,
  popupContent,
  value,
  editButtonColor = "var(--secondary)",
}: TriggerPopupEditButtonProps) {
  return (
    <div className={styles.TriggerPopupEditButtonContainer}>
      <div>
        <label className={styles.Label}>{label}</label>
        <div className={classes("text-with-ellipsis", styles.ValueSpanWrapper)}>
          <span>{value}</span>
        </div>
      </div>
      <div className={styles.EditButtonWrapper}>
        <IconButton className={styles.EditingToggleButtonEditButton}>
          <i className="far fa-edit" style={{ color: editButtonColor }} />
        </IconButton>
      </div>
      <AnimatedPopup>{popupContent}</AnimatedPopup>
    </div>
  );
}

export default TriggerPopupEditButton;
