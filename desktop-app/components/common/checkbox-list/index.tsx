import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import Checkbox from "../form/checkbox";
import Maybe from "../helpers/maybe";
import styles from "./styles.module.scss";

type option = { label: string; value: any; name: string; checked: boolean };

type CheckBoxListProps = {
  options: option[];
  title: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  initialListLength?: number;
};

function CheckBoxList({
  options,
  handleChange,
  title,
  initialListLength = 4,
}: CheckBoxListProps) {
  const [showMore, setShowMore] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showMore) return;
    let elWrap = divRef.current;
    const wrect = elWrap.getBoundingClientRect();
    let prevHeight = wrect.height + "px";

    // // set only the content that will be vislbe after animation to display:block
    // // other content that will not be visible to display: none;
    elWrap.style.opacity = "0";
    elWrap.style.height = "auto";
    let rect = elWrap.getBoundingClientRect();
    let newHeight = rect.height;

    // // That temporary height is never rendered in the browser
    // //   Restore the original height before any rendering
    elWrap.style.height = prevHeight;

    // // Start Animation in next Animation frame from original height to new height
    // //  Reveal the contents via opacity animation

    requestAnimationFrame(() => {
      elWrap.style.height = newHeight + "px";
      elWrap.style.transitionDuration = "0.6s";
      elWrap.style.transitionTimingFunction = "ease";
      elWrap.style.opacity = "1";
    });
  }, [showMore]);
  return (
    <div>
      <p className={styles.Title}>{title}</p>
      {options.slice(0, initialListLength).map((option) => (
        <>
          <Checkbox
            style={{
              margin: "0 0 11px 0",
            }}
            name={option.name}
            label={option.label}
            value={option.value}
            checked={option.checked}
            onChange={(event) => handleChange(event)}
          ></Checkbox>
        </>
      ))}
      {showMore ? (
        <div
          ref={divRef}
          style={{
            height: "0px",
            opacity: "0",
            overflow: "hidden",
          }}
        >
          {options.slice(initialListLength).map((option) => (
            <Checkbox
              style={{
                margin: "0 0 11px 0",
              }}
              label={option.label}
              name={option.name}
              value={option.value}
              checked={option.checked}
              onChange={(event) => handleChange(event)}
            ></Checkbox>
          ))}
        </div>
      ) : null}
      <Maybe it={options.length > 4}>
        <div>
          <span
            onClick={() => setShowMore((prevState) => !prevState)}
            className={styles.CTAShowMore}
          >
            <Maybe
              it={showMore}
              orElse={<FormattedMessage defaultMessage="Ver mas" />}
            >
              <FormattedMessage defaultMessage="Ver menos" />
            </Maybe>
          </span>
        </div>
      </Maybe>
    </div>
  );
}

export default CheckBoxList;
