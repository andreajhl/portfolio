import classes from "classnames";
import { ShareGiftDropdown } from "desktop-app/components/common/widgets/share-gift-dropdown";
import styles from "./styles.module.scss";

type ShareGiftDropdownButtonProps = {
  className?: string;
  deliveryTo: string;
  deliveryFrom: string;
  contractReference: string;
};

function ShareGiftDropdownButton({
  className = "",
  deliveryTo,
  contractReference,
}: ShareGiftDropdownButtonProps) {
  return (
    <ShareGiftDropdown
      deliveryTo={deliveryTo}
      contractReference={contractReference}
      menuPosition="bottom center"
      buttonClassName={classes(
        "btn btn-secondary text-with-ellipsis",
        styles.CTAButton,
        className
      )}
      buttonChildren={`Enviar video a ${deliveryTo}`}
    />
  );
}

export { ShareGiftDropdownButton };
