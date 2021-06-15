import { NUMBER_OF_RELOAD_REALIZED } from "constants/keys";
import { setCookie } from "lib/setCookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getCookie from "react-app/src/utils/getCookie";

type ReloadingPathProps = {
  path: string;
  renderText: (counter) => JSX.Element;
};

function ReloadingPath({ path, renderText }: ReloadingPathProps) {
  const { push } = useRouter();

  const [secondsCounter, setSecondsCounter] = useState(5);
  const numberOfRetryRealizedInSession = Number(
    getCookie(NUMBER_OF_RELOAD_REALIZED)
  );
  useEffect(() => {
    let id;
    if (
      isNaN(numberOfRetryRealizedInSession) ||
      numberOfRetryRealizedInSession < 4
    ) {
      if (secondsCounter < 1) return;
      id = setTimeout(() => {
        setSecondsCounter(secondsCounter - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [secondsCounter]);

  useEffect(() => {
    if (secondsCounter > 1) return;
    const numberOfRetryRealizedInSession = Number(
      getCookie(NUMBER_OF_RELOAD_REALIZED)
    );
    setCookie(
      NUMBER_OF_RELOAD_REALIZED,
      String(
        numberOfRetryRealizedInSession ? numberOfRetryRealizedInSession + 1 : 1
      ),
      1
    );
    if (
      isNaN(numberOfRetryRealizedInSession) ||
      numberOfRetryRealizedInSession < 4
    ) {
      push(path);
    }
  }, [secondsCounter]);
  return isNaN(numberOfRetryRealizedInSession) ||
    numberOfRetryRealizedInSession < 4
    ? renderText(secondsCounter)
    : null;
}

export default ReloadingPath;
