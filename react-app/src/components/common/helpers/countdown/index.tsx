import useCountdownUntilDate from "lib/hooks/useCountdownUntilDate";

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
  const { hours, minutes, seconds } = useCountdownUntilDate(
    finishDate,
    twoDigits
  );

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
