import getClockDifference from "lib/utils/getClockDifference";
import objectFromEntries from "lib/utils/objectFromEntries";
import { useState } from "react";
import useInterval from "./useInterval";

const ONE_DAY_IN_MILLISECONDS = 86400000;

const fallbackValue = 0;

const toTwoDigits = (value: number): string =>
  value <= 9 ? "0" + value : value?.toString();

type TimeRemainingType = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function useCountdownUntilDate(finishDate: Date, twoDigits?: boolean) {
  const [timeRemaining, setTimeRemaining] = useState(
    getClockDifference(finishDate)
  );
  const timeDifference = Number(finishDate) - Date.now();
  const shouldRunCountdown =
    timeDifference > 0 && timeDifference <= ONE_DAY_IN_MILLISECONDS;
  const delay = shouldRunCountdown ? 1000 : null;

  useInterval(() => setTimeRemaining(getClockDifference(finishDate)), delay);

  return objectFromEntries(
    Object.entries(timeRemaining).map(([key, value]) => {
      const valueNumber = isNaN(value) ? fallbackValue : value;
      return [
        key,
        twoDigits ? toTwoDigits(valueNumber) : valueNumber?.toString(),
      ];
    })
  ) as TimeRemainingType;
}

export default useCountdownUntilDate;
