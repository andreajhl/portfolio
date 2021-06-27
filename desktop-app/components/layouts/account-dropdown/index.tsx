import { Dropdown } from "../../common/button/dropdown";
import {
  AvatarIcon,
  HelpIcon,
  PlayIcon,
  StarIcon,
  UserIcon,
} from "desktop-app/components/common/icons";
import { ReactNode } from "react";
import { NavLink } from "desktop-app/components/common/routing/nav-link";
import styles from "./styles.module.scss";
import {
  CLIENT_HIRINGS,
  CLIENT_PROFILE,
  FEED_SUBSCRIPTION,
  FAQS_PATH,
} from "constants/paths";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "react-app/src/components/containers/login-button/login-button";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { FormattedMessage } from "react-intl";

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: ReactNode;
  to: string;
};

const menuItems: MenuItemType[] = [
  {
    id: "my-profile",
    icon: <UserIcon />,
    label: <FormattedMessage defaultMessage="Mi perfil" />,
    to: CLIENT_PROFILE,
  },
  {
    id: "my-hiring",
    icon: <PlayIcon fill="none" />,
    label: <FormattedMessage defaultMessage="Mis solicitudes" />,
    to: CLIENT_HIRINGS,
  },
  {
    id: "my-subscriptions",
    icon: <StarIcon />,
    label: <FormattedMessage defaultMessage="Mis suscripciones" />,
    to: FEED_SUBSCRIPTION,
  },
  {
    id: "help",
    icon: <HelpIcon />,
    label: <FormattedMessage defaultMessage="Ayuda" />,
    to: FAQS_PATH,
  },
];

const toMenuItem = ({ id, to, icon, label }) => (
  <NavLink to={to} className={styles.AccountDropdownItem} key={id} exact>
    {icon}
    <span>{label}</span>
  </NavLink>
);

function AccountDropdown() {
  const { isAuthenticated, user } = useAuth0();

  const userAvatar = user?.picture || "";

  return (
    <Maybe
      it={isAuthenticated}
      orElse={<LoginButton className={styles.AccountDropdownLoginButton} />}
    >
      <Dropdown
        menuPosition="bottom right"
        buttonChildren={
          <Maybe it={userAvatar !== ""} orElse={<AvatarIcon />}>
            <ProfilePicture avatar={userAvatar} width={34} />
          </Maybe>
        }
        buttonClassName="p-0"
        menuClassName={styles.AccountDropdownMenu}
      >
        {menuItems.map(toMenuItem)}
      </Dropdown>
    </Maybe>
  );
}

export { AccountDropdown };
