import { availableCardColors } from "constants/hiring-preview-configuration";
import { RadioInputs } from "../../common/form/radio-inputs";
import styles from "./styles.module.scss";

type CardColorSelectorProps = {
  onChange?: (value: any) => void;
  value?: any;
};

function CardColorSelector({
  onChange = function () {},
  value,
}: CardColorSelectorProps) {
  return (
    <RadioInputs
      className={styles.CardColorSelector}
      onChange={onChange}
      value={value}
    >
      {availableCardColors.map((color, index) => (
        <RadioInputs.Option
          key={color}
          id={`color-${color}`}
          value={color}
          name="colors"
          selectedClassName={styles.SelectedColor}
        >
          <div
            className={styles.ColorOption}
            style={{
              backgroundColor: color,
            }}
          />
        </RadioInputs.Option>
      ))}
    </RadioInputs>
  );
}

export { CardColorSelector };
