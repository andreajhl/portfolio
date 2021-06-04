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
      <div className={styles.RadioInputsWrapper}>
        <RadioInputs
          className={styles.PageBackgroundSelector}
          name="PageBackgroundSelector"
          onChange={onChange}
          value={value}
        >
          {availablePageBackgroundsUrls.map((backgroundUrl, index) => (
            <RadioInputs.Option
              key={backgroundUrl}
              value={backgroundUrl}
              id={backgroundUrl}
              selectedClassName={styles.SelectedBackground}
            >
              <img
                className={styles.backgroundOption}
                src={backgroundUrl.replace(".png", "-small.png")}
                alt={`Fondo de pagina numero ${index + 1}`}
              />
            </RadioInputs.Option>
          ))}
        </RadioInputs>
      </div>
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
