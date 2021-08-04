import classes from "classnames";
import { ShareGiftDropdown } from "desktop-app/components/common/widgets/share-gift-dropdown";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  buttonChildrenText: {
    defaultMessage: "Enviar video a {deliveryTo} ahora",
  },
});

type ShareGiftDropdownButtonProps = {
  className?: string;
  deliveryTo: string;
  contractReference: string;
};

function ShareGiftDropdownButton({
  className = "",
  deliveryTo,
  contractReference,
}: ShareGiftDropdownButtonProps) {
  const { formatMessage } = useIntl();
  const buttonChildrenText = formatMessage(messages.buttonChildrenText, {
    deliveryTo,
  });

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
      buttonChildren={buttonChildrenText}
    />
  );
}

export { ShareGiftDropdownButton };
