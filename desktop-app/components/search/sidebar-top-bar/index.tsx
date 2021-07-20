import { FormattedMessage } from "react-intl";
import { IconButton } from "../../common/button/icon-button";
import styles from "./styles.module.scss";

type SidebarTopBarProps = { toggleSidebar?: () => void };

function SidebarTopBar({ toggleSidebar = function () {} }: SidebarTopBarProps) {
  return (
    <>
      <h2 className={styles.SidebarTopBarTitle}>
        <FormattedMessage defaultMessage="Filtrar por" />
      </h2>
      <IconButton className={styles.SidebarTopBarClose} onClick={toggleSidebar}>
        <i className="fa fa-times" />
      </IconButton>
    </>
  );
}

export { SidebarTopBar };
