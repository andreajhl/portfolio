import styles from "./styles.module.scss";
import {
  availableActionButtonsBackgroundColors,
  availableCardColors,
  availablePageBackgroundsUrls,
  getActionButtonsBackgroundColorsForPageBackground,
} from "constants/hiring-preview-configuration";
import { useEffect, useMemo, useRef, useState } from "react";
import { CardColorSelector } from "desktop-app/components/hiring-preview-editor/card-color-selector";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { OccasionType } from "desktop-app/types/contractDataType";
import useForm from "lib/hooks/useForm";
import { Dispatch } from "react";
import { getGiftPreviewPath } from "constants/paths";
import { SaveStatus } from "desktop-app/components/hiring-preview-editor/save-status";
import debounce from "lodash.debounce";
import useStatus from "lib/hooks/useStatus";
import { PageBackgroundSelector } from "desktop-app/components/hiring-preview-editor/page-background-selector";
import { EditorFormGiftCard } from "../editor-form-gift-card";
import { Collapse } from "react-bootstrap";
import { saveHiringPreviewConfiguration } from "react-app/src/state/ducks/contracts/actions";
import getObjectWithFallbackValues from "../../../../lib/utils/getObjectWithFallbackValues";

const initialValues: HiringPreviewConfigurationType = {
  cardColor: availableCardColors[0],
  cardTitle: "",
  cardMessage: "",
  pageBackgroundUrl: availablePageBackgroundsUrls[0],
  actionButtonsBackgroundColor: availableActionButtonsBackgroundColors[0],
};

const getInitialValues = (
  hiringPreviewConfiguration: HiringPreviewConfigurationType
) =>
  getObjectWithFallbackValues(hiringPreviewConfiguration, initialValues, [
    "pageBackgroundUrl",
  ]);

type EditorFormProps = {
  contractReference: string;
  occasion: OccasionType;
  hiringPreviewConfiguration?: HiringPreviewConfigurationType;
  onChange: Dispatch<any>;
};

function EditorForm({
  contractReference,
  occasion,
  hiringPreviewConfiguration = {},
  onChange,
}: EditorFormProps) {
  const [status, setStatus] = useStatus();
  const { values, setFieldValue, onChangeField } = useForm({
    initialValues: getInitialValues(hiringPreviewConfiguration),
  });
  const [cardColorSelectorIsVisible, setCardColorSelectorIsVisible] = useState(
    false
  );
  const isFirstRender = useRef(true);

  const debouncedSaveHiringPreview = useMemo(
    () =>
      debounce(async (hiringPreviewConfiguration) => {
        setStatus("loading");
        try {
          await saveHiringPreviewConfiguration(hiringPreviewConfiguration);
          setStatus("completed");
        } catch (error) {
          setStatus("rejected");
        } finally {
          setTimeout(() => setStatus("idle"), 5000);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      debouncedSaveHiringPreview(values);
    }
  }, [values]);

  useEffect(() => {
    onChange({
      ...values,
      cardTitle: values.cardTitle || "Agrega un titulo",
      cardMessage: values.cardMessage || "Agrega un texto especial",
    });
  }, [values]);

  function toggleCardColorSelectorIsHidden() {
    setCardColorSelectorIsVisible((isVisible) => !isVisible);
  }

  function changeCardColor(color: any) {
    setFieldValue("cardColor", color);
  }

  function changePageBackground(background: any) {
    setFieldValue("pageBackgroundUrl", background);
    setFieldValue(
      "actionButtonsBackgroundColor",
      getActionButtonsBackgroundColorsForPageBackground(background)
    );
  }

  return (
    <div className={styles.EditorForm}>
      <EditorFormGiftCard
        occasion={occasion}
        values={values}
        onChange={onChangeField}
        onClickColorSelectorToggler={toggleCardColorSelectorIsHidden}
      />
      <div className={styles.FormFields}>
        <Collapse in={cardColorSelectorIsVisible}>
          <div className={styles.CollapsibleCardColorSelector}>
            <section className={styles.CardColorSelectorWrapper}>
              <h3 className={styles.FieldTitle}>Color de la tarjeta</h3>
              <CardColorSelector
                onChange={changeCardColor}
                value={values.cardColor}
              />
            </section>
          </div>
        </Collapse>
        <section className={styles.PageBackgroundSelectorSection}>
          <h3 className={styles.FieldTitle}>Agregar fondo</h3>
          <PageBackgroundSelector
            onChange={changePageBackground}
            value={values.pageBackgroundUrl}
          />
        </section>
        <div className={styles.FormButtons}>
          <a
            className={styles.PreviewLink}
            href={`${getGiftPreviewPath(contractReference)}?previewMode=true`}
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="btn btn-tertiary">
              Previsualizar
            </button>
          </a>
        </div>
        <SaveStatus className={styles.SaveStatusWrapper} status={status} />
      </div>
    </div>
  );
}

export { EditorForm };
