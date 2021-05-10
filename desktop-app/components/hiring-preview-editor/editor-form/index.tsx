import { connect } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "desktop-app/components/common/cards/gift-card";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type EditorFormProps = {} & StateProps & DispatchProps;

function EditorForm({ ...props }: EditorFormProps) {
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
    </div>
  );
}

const _EditorForm = connect(mapStateToProps, mapDispatchToProps)(EditorForm);

export { _EditorForm as EditorForm };
