import { useState } from "react";
import limitString from "react-app/src/utils/limitString";

export function CollapsibleText({
  children,
  className = "",
  lengthLimit = 200
}: {
  children: string;
  className?: string;
  lengthLimit?: number;
}) {
  const [isCollapse, setIsCollapse] = useState(true);

  function toggleCollapse() {
    setIsCollapse((isCollapse) => !isCollapse);
  }

  return (
    <p className={className}>
      {isCollapse ? limitString(children, lengthLimit) : children}{" "}
      {children.length > lengthLimit ? (
        <span
          className="font-weight-bold cursor-pointer"
          onClick={toggleCollapse}
        >
          {isCollapse ? "Mostrar más" : "Mostrar menos"}
        </span>
      ) : null}
    </p>
  );
}
