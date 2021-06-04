import { useEffect, useState } from "react";
import { GiftCard } from "../../common/cards/gift-card";
import AutoHeightTextarea from "react-textarea-autosize";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { FillDripIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import styles from "./styles.module.scss";

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
  const [titleMinRows, setTitleMinRows] = useState(2);

  useEffect(() => {
    // Para actualizar el textarea y evitar alto indebido.
    setTitleMinRows(undefined);
  }, []);

  return (
    <GiftCard
      className={styles.GiftCardPreview}
      occasion={occasion}
      cardColor={values.cardColor}
    >
      <GiftCard.Title>
        <AutoHeightTextarea
          placeholder="Agrega un titulo"
          minRows={titleMinRows}
          name="cardTitle"
          value={values.cardTitle}
          className={styles.Textarea}
          onChange={onChange}
        />
      </GiftCard.Title>
      <GiftCard.SpecialText>
        <AutoHeightTextarea
          placeholder="Agrega un texto especial"
          name="cardMessage"
          value={values.cardMessage}
          onChange={onChange}
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
