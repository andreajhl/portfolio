import { IconButton } from "../../common/button/icon-button";
import styles from "./styles.module.scss";

type SidebarTopBarProps = { toggleSidebar?: () => void };

function SidebarTopBar({ toggleSidebar = function () {} }: SidebarTopBarProps) {
  return (
    <>
      <h2 className={styles.SidebarTopBarTitle}>Filtrar por</h2>
      <IconButton className={styles.SidebarTopBarClose} onClick={toggleSidebar}>
        <i className="fa fa-times" />
      </IconButton>
    </>
  );
}

export { SidebarTopBar };
