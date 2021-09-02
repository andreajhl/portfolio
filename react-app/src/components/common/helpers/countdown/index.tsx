import useCountdownUntilDate from "lib/hooks/useCountdownUntilDate";
import { FormattedMessage } from "react-intl";

type CountdownProps = {
  finishDate: Date;
  separator?: string;
  twoDigits?: boolean;
};

/**
 * For rendering the parts of a countdown until the finishDate.
 * It returns only TextNodes
 */
export function Countdown({
  finishDate,
  separator = ":",
  twoDigits = true,
}: CountdownProps) {
  const { days, hours, minutes, seconds } = useCountdownUntilDate(
    finishDate,
    twoDigits
  );

  const daysNumber = parseFloat(days);

  if (daysNumber > 1) {
    return (
      <FormattedMessage
        defaultMessage="{daysNumber} días"
        values={{ daysNumber }}
      />
    );
  }

  if (daysNumber > 0) {
    return <FormattedMessage defaultMessage="1 día" />;
  }

  return (
    <>
      {hours}
      {separator}
      {minutes}
      {separator}
      {seconds}
    </>
  );
}
