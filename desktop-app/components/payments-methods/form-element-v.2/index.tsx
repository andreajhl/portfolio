import React from "react";
import {
  CustomOffCanvas,
  CustomOffCanvasProps,
} from "react-app/src/components/common/widgets/custom-off-canvas";
import styles from "./styles.module.scss";

interface PaymentMethodFormElementProps {
  labelId: string;
  sectionId: string;
  expanded: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const offCanvasStyle: CustomOffCanvasProps["style"] = {
  content: {
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: "8px 8px 0 0",
  },
};

function PaymentMethodFormElementV2({
  expanded,
  labelId,
  sectionId,
  children,
  onClose,
}: PaymentMethodFormElementProps) {
  return (
    <CustomOffCanvas
      isOpen={expanded}
      position="bottom"
      width="100%"
      style={offCanvasStyle}
      overlayClassName={styles.PaymentMethodFormElementV2Overlay}
      height="auto"
      onClose={onClose}
    >
      {children}
    </CustomOffCanvas>
  );
}

export default PaymentMethodFormElementV2;
