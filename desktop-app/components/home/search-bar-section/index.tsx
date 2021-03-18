import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import styles from "./styles.module.scss";

const SearchBarSection = () => {
  return (
    <div className={styles.SearchBarSection}>
      <p>Explora entre más de 1,000 famosos</p>
      <InputWithSubmitHandler
        style={{ height: "50px", width: "600px" }}
        placeHolderButton={"Buscar"}
        placeHolderInput={"Ej: Pibe Valderrama, Músicos, México..."}
      />
    </div>
  );
};

export default SearchBarSection;
