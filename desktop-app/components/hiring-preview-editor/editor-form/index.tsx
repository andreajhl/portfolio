import { connect } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "desktop-app/components/common/cards/gift-card";
import {
  availableCardColors,
  availablePageBackgroundsUrls,
} from "constants/hiring-preview-configuration";
import { useState } from "react";
import { CardColorSelector } from "desktop-app/components/hiring-preview-editor/card-color-selector";
import { PageBackgroundSelector } from "../page-background-selector";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type EditorFormProps = {} & StateProps & DispatchProps;

function EditorForm({ ...props }: EditorFormProps) {
  const [color, setColor] = useState(availableCardColors[0]);
  const [background, setBackground] = useState(availablePageBackgroundsUrls[0]);
  // Conectar con endpoint que guarda la configuración.

  return (
    <div className={styles.EditorForm}>
      <GiftCard className={styles.GiftCardPreview} occasion="BIRTHDAY">
        <GiftCard.Title>¡Feliz cumpleaños mi amor!</GiftCard.Title>
        <button className={classes("btn", styles.TitleEditToggler)}>
          Editar título
        </button>
        <GiftCard.SpecialText>
          Agrega un texto especial....
        </GiftCard.SpecialText>
      </GiftCard>
      <div className={styles.FormFields}>
        <h3 className={styles.FieldTitle}>Color de la tarjeta</h3>
        <CardColorSelector onChange={setColor} value={color} />
        <h3 className={styles.FieldTitle}>Agregar fondo</h3>
        <PageBackgroundSelector onChange={setBackground} value={background} />
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
