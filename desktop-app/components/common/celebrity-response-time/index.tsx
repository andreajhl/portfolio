import { FormattedMessage } from "react-intl";

type CelebrityResponseTimeProps = {
  turnAroundTime: number;
  availableForFlashDeliveries: boolean;
};

const getTurnAroundText = (turnAroundTime: number) => {
  if (turnAroundTime < 1) {
    return <FormattedMessage defaultMessage="Pocas horas" />;
  } else if (turnAroundTime === 1) {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} día"
        values={{ turnAroundTime }}
      />
    );
  } else {
    return (
      <FormattedMessage
        defaultMessage="{turnAroundTime} días"
        values={{ turnAroundTime }}
      />
    );
  }
};

function CelebrityResponseTime({
  turnAroundTime,
  availableForFlashDeliveries,
}: CelebrityResponseTimeProps) {
  return (
    <span>
      {availableForFlashDeliveries ? (
        <FormattedMessage defaultMessage="Entrega flash" />
      ) : (
        getTurnAroundText(Math.round(turnAroundTime ?? 2))
      )}
    </span>
  );
}

export { CelebrityResponseTime };
