import "rheostat/initialize";
import Slider from "rheostat";
import "rheostat/css/rheostat.css";
import styles from "./styles.module.scss";
import { IconButton } from "desktop-app/components/common/button/icon-button";
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
  pitPoints:number[]
  [key: string]: any;
};



const RangeSliderBackground = (props) => {
  return <div className={styles.RangeSliderBackground} {...props} />;
};
const RangeSliderHandle = (props) => (
  <IconButton className={styles.RangeSliderHandle} {...props}>
    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1196 1.17082C14.2393 0.802296 14.7607 0.802296 14.8804 1.17082L17.8902 10.4338C17.9437 10.5987 18.0973 10.7102 18.2706 10.7102H28.0103C28.3978 10.7102 28.5589 11.2061 28.2454 11.4338L20.3658 17.1587C20.2256 17.2606 20.167 17.4411 20.2205 17.6059L23.2302 26.8689C23.35 27.2375 22.9282 27.5439 22.6147 27.3162L14.7351 21.5913C14.5949 21.4894 14.4051 21.4894 14.2649 21.5913L6.38529 27.3162C6.0718 27.5439 5.65001 27.2375 5.76975 26.8689L8.77949 17.6059C8.83304 17.4411 8.77438 17.2606 8.63418 17.1587L0.754583 11.4338C0.441097 11.2061 0.602208 10.7102 0.989697 10.7102H10.7294C10.9027 10.7102 11.0563 10.5987 11.1098 10.4338L14.1196 1.17082Z" fill="#FB177D"/>
    </svg>
  </IconButton>
);

const RangeSliderProgressBar = (props) => (
  <div className={styles.RangeSliderProgressBar} {...props} />
);



function RangeSlider({
  className = "",
  algorithm = rangeSliderLog10Algorithm,
  isTouched = true,
  pitPoints,
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
        handle={RangeSliderHandle}
        background={RangeSliderBackground}
        progressBar={RangeSliderProgressBar }
        pitPoints={pitPoints}
        {...props}
      />
    </div>    
  );
}

export { RangeSlider };
