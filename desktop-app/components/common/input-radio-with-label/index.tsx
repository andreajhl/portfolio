import React, { useState } from "react";
import styles from "./styles.module.scss";
import { XIcon } from "../icons/index";
const InputRadioWithLabel = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <label
        className={styles.Label}
        htmlFor="custom-radio-button"
        style={{
          alignItems: "center",
          cursor: "pointer",
          display: "inline-flex",
        }}
      >
        <input
          id="custom-radio-button"
          type="radio"
          name="option"
          //   value="1"
          checked={isChecked}
          className={styles.Radio}
        />
        <div
          style={{
            borderRadius: "9999px",
            marginRight: "8px",
          }}
          //  style="border:1px solid rgba(0,0,0,.3);border-radius:9999px;margin-right:8px;padding:4px"
        >
          <div
            style={{
              backgroundColor: "black",
              borderRadius: "999px",
              height: "16px",
              width: "16px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 9 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.89099 0.843733L8.18519 0.113998C8.03903 -0.0371334 7.80107 -0.0381289 7.65371 0.111814L3.22676 4.61575L1.35416 2.67957C1.20799 2.52844 0.970032 2.52744 0.822678 2.67735L0.111149 3.40124C-0.0362052 3.55115 -0.0371761 3.79521 0.109019 3.94638L2.95216 6.886C3.09832 7.03713 3.33628 7.03813 3.48364 6.88819L8.88889 1.38887C9.03621 1.23892 9.03715 0.994865 8.89099 0.843733Z' fill='white'/%3E%3C/svg%3E%0A")`,
              backgroundPosition: "center",
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
            }}
            //   style="background-color:#00449e;border-radius:9999px;height:16px;width:16px"
          ></div>
        </div>
        <div>Si</div>
      </label>
      {/* <label className={styles.Label}>
        <input type="radio" className={styles.Radio} />
        <div className={styles.FakeCircle}>
          <div className={styles.InnerCicle} />
          Si
        </div>
      </label> */}
    </>
  );
};

export default InputRadioWithLabel;
