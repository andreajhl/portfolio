import { useEffect, useState } from "react";
import { GiftCard } from "../../common/cards/gift-card";
import AutoHeightTextarea from "react-textarea-autosize";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { FillDripIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  cardTitlePlaceholder: {
    defaultMessage: "Agrega un titulo",
  },
  cardMessagePlaceholder: {
    defaultMessage: "Agrega un texto especial",
  },
});

type EditorFormGiftCardProps = {
  occasion: string;
  values: HiringPreviewConfigurationType;
  onChange?: ({
    target: { name, value },
  }: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  onClickColorSelectorToggler?: () => void;
};

function EditorFormGiftCard({
  occasion,
  values,
  onChange = function () {},
  onClickColorSelectorToggler = function () {},
}: EditorFormGiftCardProps) {
  const { formatMessage } = useIntl();
  const [titleMinRows, setTitleMinRows] = useState(2);

  useEffect(() => {
    // Para actualizar el textarea y evitar alto indebido.
    setTitleMinRows(undefined);
  }, []);

  const cardTitlePlaceholder = formatMessage(messages.cardTitlePlaceholder);
  const cardMessagePlaceholder = formatMessage(messages.cardMessagePlaceholder);

  return (
    <GiftCard
      className={styles.GiftCardPreview}
      occasion={occasion}
      cardColor={values.cardColor}
    >
      <GiftCard.Title>
        <AutoHeightTextarea
          placeholder={cardTitlePlaceholder}
          minRows={titleMinRows}
          name="cardTitle"
          value={values.cardTitle}
          className={styles.Textarea}
          onChange={onChange}
          maxLength={50}
        />
      </GiftCard.Title>
      <GiftCard.SpecialText>
        <AutoHeightTextarea
          placeholder={cardMessagePlaceholder}
          name="cardMessage"
          value={values.cardMessage}
          onChange={onChange}
          maxLength={1700}
          className={styles.Textarea}
        />
      </GiftCard.SpecialText>
      <button
        className={classes("btn", styles.cardColorSelectorToggler)}
        onClick={onClickColorSelectorToggler}
      >
        <FillDripIcon />
      </button>
    </GiftCard>
  );
}

export { EditorFormGiftCard };
