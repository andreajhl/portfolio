import Maybe from "react-app/src/components/common/helpers/maybe";
import { IconButton } from "../icon-button";
import styles from "./styles.module.scss";

type EditingToggleButtonProps = {
  isEditing?: boolean;
  editButtonColor?: string;
  saveButtonColor?: string;
  onClickEdit?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onClickSave?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function EditingToggleButton({
  isEditing = false,
  editButtonColor = "var(--tertiary)",
  saveButtonColor = "var(--tertiary)",
  onClickEdit = function () {},
  onClickSave = function () {}
}: EditingToggleButtonProps) {
  return (
    <Maybe
      it={isEditing}
      orElse={
        <IconButton
          className={styles.EditingToggleButtonEditButton}
          onClick={onClickEdit}
        >
          <i className="far fa-edit" style={{ color: editButtonColor }} />
        </IconButton>
      }
    >
      <button
        className={"btn " + styles.EditingToggleButtonSaveButton}
        onClick={onClickSave}
        style={{ color: saveButtonColor }}
      >
        Guardar
      </button>
    </Maybe>
  );
}

export { EditingToggleButton };
