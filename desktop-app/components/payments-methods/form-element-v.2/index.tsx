import React from "react";
import {
  CustomOffCanvas,
  CustomOffCanvasProps,
} from "react-app/src/components/common/widgets/custom-off-canvas";

interface PaymentMethodFormElementProps {
  labelId: string;
  sectionId: string;
  expanded: boolean;
  children: React.ReactNode;
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
}: PaymentMethodFormElementProps) {
  return (
    <CustomOffCanvas
      isOpen={expanded}
      position="bottom"
      width="100%"
      style={offCanvasStyle}
      height="auto"
    >
      <div className="container py-4">{children}</div>
    </CustomOffCanvas>
  );
}

export default PaymentMethodFormElementV2;
