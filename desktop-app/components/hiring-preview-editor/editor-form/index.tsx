import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { GiftCard } from "desktop-app/components/common/cards/gift-card";
import {
  availableActionButtonsBackgroundColors,
  availableCardColors,
  availablePageBackgroundsUrls,
  getActionButtonsBackgroundColorsForPageBackground,
} from "constants/hiring-preview-configuration";
import { useEffect, useRef, useState } from "react";
import { CardColorSelector } from "desktop-app/components/hiring-preview-editor/card-color-selector";
import { PageBackgroundSelector } from "../page-background-selector";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { OccasionType } from "desktop-app/types/contractDataType";
import useForm from "lib/hooks/useForm";
import { Dispatch } from "react";
import { getGiftPreviewPath } from "constants/paths";
import AutoHeightTextarea from "react-textarea-autosize";
import { SaveStatus } from "desktop-app/components/hiring-preview-editor/save-status";
import useStatus from "../../../../lib/hooks/useStatus";
import debounce from "lodash.debounce";

const initialValues: HiringPreviewConfigurationType = {
  cardColor: availableCardColors[0],
  cardTitle: "",
  cardMessage: "",
  pageBackgroundUrl: availablePageBackgroundsUrls[0],
  actionButtonsBackgroundColor: availableActionButtonsBackgroundColors[0],
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type EditorFormProps = {
  contractReference: string;
  occasion: OccasionType;
  onChange: Dispatch<any>;
} & StateProps &
  DispatchProps;

function EditorForm({
  contractReference,
  occasion,
  onChange,
}: EditorFormProps) {
  const [status, setStatus] = useStatus();
  const { values, setFieldValue, onChangeField } = useForm({ initialValues });
  const [titleMinRows, setTitleMinRows] = useState(2);
  const isFirstRender = useRef(true);

  // Conectar con endpoint que guarda la configuración.

  useEffect(() => {
    onChange({
      ...values,
      cardTitle: values.cardTitle || "Agrega un titulo",
      cardMessage: values.cardMessage || "Agrega un texto especial",
    });
  }, [values]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      debounce(() => {
        setStatus("loading");
        setTimeout(() => {
          setStatus("completed");
          setTimeout(() => setStatus("idle"), 5000);
        }, 2000);
      }, 1000)();
    }
  }, [values]);

  useEffect(() => {
    // Para actualizar el textarea y evitar alto indebido.
    setTitleMinRows(undefined);
  }, []);

  return (
    <div className={styles.EditorForm}>
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
            onChange={onChangeField}
          />
        </GiftCard.Title>
        <GiftCard.SpecialText>
          <AutoHeightTextarea
            placeholder="Agrega un texto especial"
            name="cardMessage"
            value={values.cardMessage}
            onChange={onChangeField}
            className={styles.Textarea}
          />
        </GiftCard.SpecialText>
      </GiftCard>
      <div className={styles.FormFields}>
        <h3 className={styles.FieldTitle}>Color de la tarjeta</h3>
        <CardColorSelector
          onChange={(color) => setFieldValue("cardColor", color)}
          value={values.cardColor}
        />
        <h3 className={styles.FieldTitle}>Agregar fondo</h3>
        <PageBackgroundSelector
          onChange={(background) => {
            setFieldValue("pageBackgroundUrl", background);
            setFieldValue(
              "actionButtonsBackgroundColor",
              getActionButtonsBackgroundColorsForPageBackground(background)
            );
          }}
          value={values.pageBackgroundUrl}
        />
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

const _EditorForm = connect(mapStateToProps, mapDispatchToProps)(EditorForm);

export { _EditorForm as EditorForm };
