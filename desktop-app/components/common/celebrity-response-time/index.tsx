type CelebrityResponseTimeProps = {
  turnAroundTime: number;
  availableForFlashDeliveries: boolean;
};

const getTurnAroundText = (turnAroundTime: number) => {
  if (turnAroundTime < 1) {
    return "Pocas horas";
  } else if (turnAroundTime === 1) {
    return `${turnAroundTime} día`;
  } else {
    return `${turnAroundTime} días`;
  }
};

function CelebrityResponseTime({
  turnAroundTime,
  availableForFlashDeliveries
}: CelebrityResponseTimeProps) {
  return (
    <span>
      {availableForFlashDeliveries
        ? "Entrega flash (< de 24 hrs)"
        : getTurnAroundText(Math.round(turnAroundTime))}
    </span>
  );
}

export { CelebrityResponseTime };
