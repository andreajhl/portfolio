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
    <RadioInputs onChange={onChange} value={value}>
      {availableCardColors.map((color, index) => (
        <RadioInputs.Option
          id={`color-${color}`}
          value={color}
          name="colors"
          selectedClassName={styles.SelectedColor}
        >
          <div
            className={styles.ColorOption}
            style={{
              backgroundColor: color,
              marginLeft: index === 0 ? 0 : 28,
            }}
          />
        </RadioInputs.Option>
      ))}
    </RadioInputs>
  );
}

export { CardColorSelector };
