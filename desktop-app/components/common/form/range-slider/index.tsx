import "rheostat/initialize";
import Slider from "rheostat";
import "rheostat/css/rheostat.css";
import styles from "./styles.module.scss";
import { IconButton } from "../../button/icon-button";
import { HandleIcon } from "../../icons";
import rangeSliderLog10Algorithm from "lib/utils/rangeSliderLog10Algorithm";

type RangeSliderProps = {
  className?: string;
  algorithm?: {
    getValue: (value: number, min: number, max: number) => number;
    getPosition: (positionPercent: number, min: number, max: number) => number;
  };
  values: [number, number];
  [key: string]: any;
};

const RangeSliderBackground = (props) => (
  <div className={styles.RangeSliderBackground} {...props} />
);

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
  ...props
}: RangeSliderProps) {
  return (
    <div className={`${styles.RangeSlider} ${className}`}>
      <Slider
        algorithm={algorithm}
        background={RangeSliderBackground}
        handle={RangeSliderHandle}
        progressBar={RangeSliderProgressBar}
        {...props}
      />
    </div>
  );
}

export { RangeSlider };
