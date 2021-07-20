import { availablePageBackgroundsUrls } from "constants/hiring-preview-configuration";
import { RadioInputs } from "desktop-app/components/common/form/radio-inputs";
import styles from "./styles.module.scss";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  backgroundOptionImgAlt: {
    defaultMessage: "Fondo de pagina numero {pageNumber}",
  },
});

type PageBackgroundSelectorProps = {
  onChange?: (value: any) => void;
  value?: any;
};

function PageBackgroundSelector({
  onChange = function () {},
  value,
}: PageBackgroundSelectorProps) {
  const { formatMessage } = useIntl();
  return (
    <>
      <div className={styles.RadioInputsWrapper}>
        <RadioInputs
          className={styles.PageBackgroundSelector}
          name="PageBackgroundSelector"
          onChange={onChange}
          value={value}
        >
          {availablePageBackgroundsUrls.map((backgroundUrl, index) => {
            const backgroundOptionImgAlt = formatMessage(
              messages.backgroundOptionImgAlt,
              { pageNumber: index + 1 }
            );

            return (
              <RadioInputs.Option
                key={backgroundUrl}
                value={backgroundUrl}
                id={backgroundUrl}
                selectedClassName={styles.SelectedBackground}
              >
                <img
                  className={styles.backgroundOption}
                  src={backgroundUrl.replace(".png", "-small.png")}
                  alt={backgroundOptionImgAlt}
                />
              </RadioInputs.Option>
            );
          })}
        </RadioInputs>
      </div>
      <button
        type="button"
        className={"btn " + styles.ResetButton}
        onClick={() => onChange(null)}
      >
        <FormattedMessage defaultMessage="Quitar fondo" />
      </button>
    </>
  );
}

export { PageBackgroundSelector };
