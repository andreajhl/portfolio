import { Children, cloneElement, ReactNode, StyleHTMLAttributes } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type SidebarWrapperProps = {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
};

function SidebarWrapper({
  children,
  isOpen,
  className = ""
}: SidebarWrapperProps) {
  return (
    <div
      className={classes(
        styles.SidebarWrapper,
        !isOpen && styles.SidebarWrapperIsClosed,
        className
      )}
    >
      {Children.map(children, (child: any) =>
        isAllowed(child)
          ? cloneElement(child, Object.assign({ isOpen }, child.props))
          : null
      )}
    </div>
  );
}

function isAllowed(child: any) {
  return child.type && [Sidebar, MainContent].includes(child.type);
}

type SidebarProps = {
  children: ReactNode;
  width: string | number;
  className?: string;
  isOpen?: boolean;
};

function Sidebar({
  children,
  width = 100,
  className = "",
  isOpen = false
}: SidebarProps) {
  return (
    <aside
      className={classes(styles.Sidebar, className)}
      style={{ width, marginLeft: isOpen ? 0 : -width }}
    >
      {children}
    </aside>
  );
}

function MainContent({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={classes(styles.MainContent, className)}>{children}</main>
  );
}

export { SidebarWrapper, Sidebar, MainContent };
