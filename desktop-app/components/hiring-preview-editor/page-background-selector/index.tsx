import { availablePageBackgroundsUrls } from "constants/hiring-preview-configuration";
import { RadioInputs } from "desktop-app/components/common/form/radio-inputs";
import styles from "./styles.module.scss";

type PageBackgroundSelectorProps = {
  onChange?: (value: any) => void;
  value?: any;
};

function PageBackgroundSelector({
  onChange = function () {},
  value,
}: PageBackgroundSelectorProps) {
  return (
    <>
      <RadioInputs
        name="PageBackgroundSelector"
        onChange={onChange}
        value={value}
      >
        {availablePageBackgroundsUrls.map((backgroundUrl, index) => (
          <RadioInputs.Option
            value={backgroundUrl}
            id={backgroundUrl}
            selectedClassName={styles.SelectedBackground}
          >
            <img
              className={styles.backgroundOption}
              src={backgroundUrl.replace(".png", "-small.png")}
              alt={`Fondo de pagina numero ${index + 1}`}
              style={{ marginLeft: index === 0 ? 0 : 9 }}
            />
          </RadioInputs.Option>
        ))}
      </RadioInputs>
      <button
        type="button"
        className={"btn " + styles.ResetButton}
        onClick={() => onChange(null)}
      >
        Quitar fondo
      </button>
    </>
  );
}

export { PageBackgroundSelector };
