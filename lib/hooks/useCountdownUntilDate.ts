import getClockDifference from "lib/utils/getClockDifference";
import objectFromEntries from "lib/utils/objectFromEntries";
import { useState } from "react";
import useInterval from "./useInterval";

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
  const shouldRunCountdown = Number(finishDate) - Date.now() > 0;
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
