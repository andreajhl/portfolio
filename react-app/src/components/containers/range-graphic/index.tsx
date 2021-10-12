import styles from "./styles.module.scss";

type rangeProps = {
  maxInputValue: string;
  minInputValue: string;
  max: number;
  rankGraphi: { price: number; percentage: number }[];
};

export const RangeGraphi = ({
  maxInputValue,
  minInputValue,
  rankGraphi,
  max
}: rangeProps) => {

  var percentage=100/rankGraphi.length;

  return (
    <div className={styles.PriceRangeGraphi}>
      {rankGraphi.length && rankGraphi.map((e,i) => (
        <p
          className={styles.PriceRangeGraphiDiv}
          style={{
            height: ` ${
              e.percentage < 10 ? `${e.percentage * 8}px` : `${e.percentage}px`
            }`,
            backgroundColor: `${
             ( ( (percentage * i ) * max / 100) >= Number(minInputValue) &&
             (( percentage * i ) * max / 100) <= Number(maxInputValue))
                ? "#FB177D"
                : "#C4C4C4"
            }`,
            width: `${100 / rankGraphi.length}%`,
          }}
        >
          x
        </p>
      ))}
    </div>
  );
};
