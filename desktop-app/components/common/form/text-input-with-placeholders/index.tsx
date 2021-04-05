import { HTMLProps } from "react";
import styles from "./styles.module.scss";

type TextInputWithPlaceholdersProps = HTMLProps<HTMLDivElement> & {
  placeholder?: string;
  value: string;
  className?: string;
};

function removeSelectedPlaceholderSpan({ key }) {
  if (key.startsWith("Arrow")) return;
  try {
    const { focusNode } = document.getSelection();
    const parent = focusNode?.parentElement;
    if (parent.matches("span[data-is-placeholder]")) parent.remove();
  } catch (error) {
    console.log(error);
  }
}

function limitLength(event, maxLength: number) {
  const hasTypedACharacter = event?.key?.length === 1;
  const { target } = event as { target: any };
  if (hasTypedACharacter && getTextContent(target).length >= maxLength) {
    event.preventDefault();
  }
}

export const getTextContent = ({
  childNodes
}: {
  childNodes: NodeListOf<ChildNode>;
}) =>
  Array.from(childNodes)
    .map(({ textContent }) => textContent)
    .join("");

function moveCursorToWordStart() {
  try {
    const selection = document.getSelection();
    selection.setPosition(selection.anchorNode, 1);
  } catch (error) {
    console.log(error);
  }
}

function replacePlaceholdersForSpans(textWithPlaceholders: string) {
  const bracketsRegExp = /(\[|\])/g;
  return textWithPlaceholders
    .split(bracketsRegExp)
    .filter((part) => !bracketsRegExp.test(part))
    .map((part, index) => {
      if (index % 2 === 0) return part;
      return (
        <span
          data-is-placeholder
          onClick={moveCursorToWordStart}
          className={styles.Placeholder}
        >
          {`[${part}]`}
        </span>
      );
    });
}

function TextInputWithPlaceholders({
  placeholder = "",
  value,
  className = "",
  contentEditable,
  suppressContentEditableWarning,
  onKeyDown = function () {},
  maxLength = Infinity,
  ...props
}: TextInputWithPlaceholdersProps) {
  return (
    <div
      data-placeholder={placeholder}
      className={`${className} ${styles.TextInputWithPlaceholders}`}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={(event) => {
        limitLength(event, maxLength);
        removeSelectedPlaceholderSpan(event);
        onKeyDown(event);
      }}
      {...props}
    >
      {replacePlaceholdersForSpans(value)}
    </div>
  );
}

export { TextInputWithPlaceholders };
