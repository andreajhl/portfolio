import { ROOT_PATH } from "constants/paths";
import { HouseIcon } from "desktop-app/components/common/icons";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";

type HomeButtonProps = {
  className?: string;
};

function HomeButton({ className = "" }: HomeButtonProps) {
  return (
    <Link href={ROOT_PATH} className={`${styles.HomeButton} ${className}`}>
      <HouseIcon />
    </Link>
  );
}

export { HomeButton };
