import "rheostat/initialize";
import Slider from "rheostat";
import "rheostat/css/rheostat.css";
import styles from "./styles.module.scss";
import { IconButton } from "../../button/icon-button";
import { HandleIcon, HandleIconPinkStars } from "../../icons";
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

const IconVariants = {
  PinkStars: <HandleIconPinkStars />,
  DefaultButtons: <HandleIcon />,
};

const RangeSliderHandle = (props, Icon = "DefaultButtons") => (
  <IconButton className={styles.RangeSliderHandle} {...props}>
    {IconVariants[Icon]}
  </IconButton>
);

const RangeSliderProgressBar = (props) => (
  <div className={styles.RangeSliderProgressBar} {...props} />
);

function RangeSlider({
  className = "",
  algorithm = rangeSliderLog10Algorithm,
  isTouched = true,
  handleIcon = "DefaultButtons",

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
        handle={(props) => RangeSliderHandle(props, handleIcon)}
        progressBar={isTouched ? RangeSliderProgressBar : NoComponent}
        {...props}
      />
    </div>
  );
}

export { RangeSlider };
