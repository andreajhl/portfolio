import styles from "./styles.module.scss";

type EditableInputEmptyProps = {
  label: string;
  className?: string;
  containerClass?: string;
  onClickButton: () => void;
};

function EditableInputEmpty({
  label,
  className = "",
  containerClass = className,
  onClickButton,
}: EditableInputEmptyProps) {
  return (
    <div className={containerClass}>
      <span className={styles.EditableInputEmptyLabel}>{label}</span>
      <span className={styles.EditableInputEmptyButton} onClick={onClickButton}>
        Agregar
      </span>
    </div>
  );
}

export { EditableInputEmpty };
