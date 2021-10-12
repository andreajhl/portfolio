import "rheostat/initialize";
import Slider from "rheostat";
import "rheostat/css/rheostat.css";
import styles from "./styles.module.scss";
import { IconButton } from "../../button/icon-button";
import { HandleIcon, HandleIconPinkStars } from "../../icons";
import rangeSliderLog10Algorithm from "lib/utils/rangeSliderLog10Algorithm";
import React from "react";

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
  handleIcon?: "PinkStars" | "DefaultButtons";
  rangeSliderBackgroundStyles?: React.CSSProperties;
  rangeSliderProgressBarStyles?: React.CSSProperties;
  [key: string]: any;
};

function NoComponent() {
  return null;
}

const RangeSliderBackground = (props, styles) => {
  return <div {...props} style={styles} />;
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

const RangeSliderProgressBar = (props, styles) => (
  <div
    style={{
      ...styles,
      ...props.style,
    }}
  />
);

function RangeSlider({
  className = "",
  algorithm = rangeSliderLog10Algorithm,
  isTouched = true,
  handleIcon = "DefaultButtons",

  rangeSliderBackgroundStyles = {
    backgroundColor: "black",
    marginLeft: "-13px",
    marginRight: "-5.5px",
    height: "1px",
  },
  rangeSliderProgressBarStyles = {
    position: "relative",
    top: "-1.25px",
    height: "2.5px",
    backgroundImage: "linear-gradient(180deg, #fb177d 0%, #ff2063 100%)",
  },
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
        background={(props) =>
          RangeSliderBackground(props, rangeSliderBackgroundStyles)
        }
        handle={(props) => RangeSliderHandle(props, handleIcon)}
        progressBar={(props) =>
          isTouched
            ? RangeSliderProgressBar(props, rangeSliderProgressBarStyles)
            : NoComponent
        }
        {...props}
      />
    </div>
  );
}

export { RangeSlider };
