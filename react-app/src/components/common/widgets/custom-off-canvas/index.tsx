import styles from "./styles.module.scss";
import OffCanvas from "react-aria-offcanvas";
import classes from "classnames";
import { CSSProperties, ReactNode } from "react";

type StyleType = { overlay?: CSSProperties; content?: CSSProperties };

export type CustomOffCanvasProps = {
  isOpen: boolean;
  width?: string;
  height?: string;
  position?: "left" | "right" | "top" | "bottom";
  mainContainerSelector?: string;
  onClose?: () => void;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  lockBodyAfterOpen?: boolean;
  trapFocusAfterOpen?: boolean;
  returnFocusAfterClose?: boolean;
  focusFirstChildAfterOpen?: boolean;
  focusThisChildAfterOpen?: string;
  style?: StyleType;
  overlayClassName?: string;
  role?: string;
  label?: string;
  labelledby?: string;
  children: ReactNode;
};

function CustomOffCanvas({ overlayClassName, ...props }: CustomOffCanvasProps) {
  return (
    <OffCanvas
      overlayClassName={classes(
        styles.CustomOffCanvasOverlay,
        overlayClassName
      )}
      {...props}
    />
  );
}

export { CustomOffCanvas };
