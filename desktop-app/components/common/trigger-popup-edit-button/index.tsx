import React, { useState } from "react";
import { IconButton } from "desktop-app/components/common/button/icon-button";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AnimatedPopup } from "../animated-popup";

const noOp = () => {};

type TriggerPopupEditButtonProps = {
  label: string;
  value: string | number;
  popupContent: React.ReactNode;
  editButtonColor?;
  onClosePopup?: typeof noOp;
};

function TriggerPopupEditButton({
  label,
  popupContent,
  value,
  editButtonColor = "var(--secondary)",
  onClosePopup = noOp,
}: TriggerPopupEditButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlerClosePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
    onClosePopup();
  };
  return (
    <div className={styles.TriggerPopupEditButtonContainer}>
      <div>
        <label className={styles.Label}>{label}</label>
        <div className={classes("text-with-ellipsis", styles.ValueSpanWrapper)}>
          <span>{value}</span>
        </div>
      </div>
      <div className={styles.EditButtonWrapper}>
        <IconButton
          onClick={() => setIsPopupOpen((prevStateve) => !prevStateve)}
          className={styles.EditingToggleButtonEditButton}
        >
          <i className="far fa-edit" style={{ color: editButtonColor }} />
        </IconButton>
      </div>
      <AnimatedPopup onClose={handlerClosePopup} modal open={isPopupOpen}>
        {popupContent}
      </AnimatedPopup>
    </div>
  );
}

export default TriggerPopupEditButton;
