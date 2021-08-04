import { getSearchKeywordPath } from "constants/paths";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import { useRouter } from "next/router";
import { useState } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import styles from "./styles.module.scss";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  inputPlaceholderButton: {
    defaultMessage: "Buscar",
  },
  inputPlaceholderInput: {
    defaultMessage: "Ej: Pibe Valderrama, Netflix, Músicos, México...",
  },
});

function SearchBarSection() {
  const { formatMessage } = useIntl();
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

  const inputPlaceholderButton = formatMessage(messages.inputPlaceholderButton);
  const inputPlaceholderInput = formatMessage(messages.inputPlaceholderInput);

  return (
    <div className={styles.SearchBarSection}>
      <p>
        <FormattedMessage defaultMessage="Explora entre más de 1,000 famosos" />
      </p>
      <InputWithSubmitHandler
        style={{ height: "50px", width: "600px" }}
        placeHolderButton={inputPlaceholderButton}
        placeHolderInput={inputPlaceholderInput}
        setInputValue={setInputValue}
        inputValue={inputValue}
        onSubmit={goToSearch}
      />
    </div>
  );
}

export default SearchBarSection;
