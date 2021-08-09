import { useEffect, useRef } from "react";
import waitFor from "../../react-app/src/utils/waitFor";
import initializeBotMaker from "react-app/src/utils/initializeBotMaker";
import { useIntl } from "lib/custom-intl";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";

function ignoreError() {
}

function useBotMaker(showBotMaker = false) {
  const botMakerChildRef = useRef();
  const { locale } = useIntl();

  function cancelPreviousWaitFor() {
    if (
      botMakerChildRef.current &&
      typeof botMakerChildRef.current.cancel === "function"
    ) {
      botMakerChildRef.current.cancel();
    }
  }

  const setBotmakerDisplay = (botMakerChild) => {
    if (!botMakerChild) return;
    botMakerChild.parentElement.classList.toggle("d-none", !showBotMaker);
  };

  const changeBotmakerDisplay = () => {
    cancelPreviousWaitFor();
    const botMakerChild = waitFor(
      () =>
        document.querySelector("iframe[title='Botmaker']") ||
        document.querySelector(
          "img[src='https://storage.googleapis.com/m-infra.appspot.com/public/whatsapp/Whatsapp_logo.svg']"
        )?.parentElement,
      500,
      1000
    );
    const isAsync = typeof botMakerChild.then === "function";

    if (isAsync) {
      botMakerChild.then(setBotmakerDisplay).catch(ignoreError);
      botMakerChildRef.current = botMakerChild;
    } else {
      setBotmakerDisplay(botMakerChild);
    }
  };

  useEffect(() => {
    if (showBotMaker) {
      initializeBotMaker(
        document,
        transformUserNavigatorLanguageToISO2Code(locale)
      );
    }
    changeBotmakerDisplay();
    return () => {
      cancelPreviousWaitFor();
    };
  }, [showBotMaker]);
}

export default useBotMaker;
