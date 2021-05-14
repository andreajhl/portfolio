import { connect } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "desktop-app/components/common/cards/gift-card";
import {
  availableCardColors,
  availablePageBackgroundsUrls,
} from "constants/hiring-preview-configuration";
import { useEffect, useState } from "react";
import { CardColorSelector } from "desktop-app/components/hiring-preview-editor/card-color-selector";
import { PageBackgroundSelector } from "../page-background-selector";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { OccasionType } from "desktop-app/types/contractDataType";
import useForm from "lib/hooks/useForm";
import { Dispatch } from "react";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type EditorFormProps = {
  occasion: OccasionType;
  onChange: Dispatch<any>;
} & StateProps &
  DispatchProps;

const initialValues: HiringPreviewConfigurationType = {
  cardColor: availableCardColors[0],
  cardTitle: "¡Feliz cumpleaños mi amor!",
  cardMessage: "Agrega un texto especial....",
  pageBackgroundUrl: availablePageBackgroundsUrls[0],
};

function EditorForm({ occasion, onChange }: EditorFormProps) {
  const { values, setFieldValue } = useForm({ initialValues });
  // Conectar con endpoint que guarda la configuración.

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <div className={styles.EditorForm}>
      <GiftCard
        className={styles.GiftCardPreview}
        occasion={occasion}
        cardColor={values.cardColor}
      >
        <GiftCard.Title>{values.cardTitle}</GiftCard.Title>
        <button className={classes("btn", styles.TitleEditToggler)}>
          Editar título
        </button>
        <GiftCard.SpecialText>{values.cardMessage}</GiftCard.SpecialText>
      </GiftCard>
      <div className={styles.FormFields}>
        <h3 className={styles.FieldTitle}>Color de la tarjeta</h3>
        <CardColorSelector
          onChange={(color) => setFieldValue("cardColor", color)}
          value={values.cardColor}
        />
        <h3 className={styles.FieldTitle}>Agregar fondo</h3>
        <PageBackgroundSelector
          onChange={(background) =>
            setFieldValue("pageBackgroundUrl", background)
          }
          value={values.pageBackgroundUrl}
        />
        <div className={styles.FormButtons}>
          <button type="button" className="btn btn-tertiary">
            Previsualizar
          </button>
          <button type="button" className="btn btn-secondary">
            Guardar ajustes
          </button>
        </div>
      </div>
    </div>
  );
}

const _EditorForm = connect(mapStateToProps, mapDispatchToProps)(EditorForm);

export { _EditorForm as EditorForm };
