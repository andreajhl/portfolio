import "rheostat/initialize";
import Slider from "rheostat";
import "rheostat/css/rheostat.css";
import styles from "./styles.module.scss";
import { IconButton } from "../../button/icon-button";
import { HandleIcon } from "../../icons";
import rangeSliderLog10Algorithm from "lib/utils/rangeSliderLog10Algorithm";

type ValuesType = [number, number];

type StateType = {
  max: number;
  min: number;
  values: ValuesType;
};

export type RangeSliderProps = {
  className?: string;
  algorithm?: {
    getValue: (value: number, min: number, max: number) => number;
    getPosition: (positionPercent: number, min: number, max: number) => number;
  };
  values: ValuesType;
  onValuesUpdated?: (state: StateType) => void;
  onClick?: () => void;
  isTouched?: boolean;
  [key: string]: any;
};

function NoComponent() {
  return null;
}

const RangeSliderBackground = (props) => {
  return <div className={styles.RangeSliderBackground} {...props} />;
};

const RangeSliderHandle = (props) => (
  <IconButton className={styles.RangeSliderHandle} {...props}>
    <HandleIcon />
  </IconButton>
);

const RangeSliderProgressBar = (props) => (
  <div className={styles.RangeSliderProgressBar} {...props} />
);

function RangeSlider({
  className = "",
  algorithm = rangeSliderLog10Algorithm,
  isTouched = true,
  ...props
}: RangeSliderProps) {
  return (
    <div
      className={`${styles.RangeSlider} ${className} ${
        isTouched ? styles.RangeSliderIsTouched : ""
      }`}
    >
      <Slider
        algorithm={algorithm}
        background={RangeSliderBackground}
        handle={RangeSliderHandle}
        progressBar={isTouched ? RangeSliderProgressBar : NoComponent}
        {...props}
      />
    </div>
  );
}

export { RangeSlider };
