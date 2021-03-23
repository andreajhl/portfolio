import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import { useRouter } from "next/router";
import { useState } from "react";
import { SEARCH_PATH } from "react-app/src/routing/Paths";
import styles from "./styles.module.scss";

const SearchBarSection = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  function goToSearch() {
    if (!inputValue) return;
    router.push(SEARCH_PATH + "?limit=20&search=" + String(inputValue));
  }

  return (
    <div className={styles.SearchBarSection}>
      <p>Explora entre más de 1,000 famosos</p>
      <InputWithSubmitHandler
        style={{ height: "50px", width: "600px" }}
        placeHolderButton={"Buscar"}
        placeHolderInput={"Ej: Pibe Valderrama, Netflix, Músicos, México..."}
        setInputValue={setInputValue}
        inputValue={inputValue}
        onSubmit={goToSearch}
      />
    </div>
  );
};

export default SearchBarSection;
