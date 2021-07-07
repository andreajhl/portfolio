import { getSearchKeywordPath } from "constants/paths";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import { useRouter } from "next/router";
import { useState } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import styles from "./styles.module.scss";

function SearchBarSection() {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  function goToSearch() {
    if (!inputValue) return;
    analytics.track("HOME_SEARCH_BAR_SUBMIT", {
      searchKeyword: inputValue,
      widget: "SearchBarSection",
    });
    router.push(getSearchKeywordPath(inputValue));
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
}

export default SearchBarSection;
