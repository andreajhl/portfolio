import { HTMLProps, KeyboardEvent } from "react";
import styles from "./styles.module.scss";

const isPlaceholderSpan = (focusedElement: HTMLElement) =>
  focusedElement.matches("span[data-is-placeholder]");

function getFocusedElement() {
  const { focusNode } = document.getSelection();
  return focusNode?.parentElement;
}

function preventErasingWhitespace(event: KeyboardEvent<HTMLDivElement>) {
  const isDeletingKey = ["Backspace", "Delete"].includes(event.key);
  if (isDeletingKey) event?.preventDefault?.();
}

function removeSelectedPlaceholderSpan(event: KeyboardEvent<HTMLDivElement>) {
  try {
    const { key } = event;
    if (key.startsWith("Arrow")) return;
    const focusedElement = getFocusedElement();
    if (!isPlaceholderSpan(focusedElement)) return;
    preventErasingWhitespace(event);
    focusedElement.remove();
  } catch (error) {
    console.log(error);
  }
}

function limitLength(event: KeyboardEvent<HTMLDivElement>, maxLength: number) {
  const hasTypedACharacter = event?.key?.length === 1;
  const { target } = event as { target: any };
  if (hasTypedACharacter && getTextContent(target).length >= maxLength) {
    event.preventDefault();
  }
}

export const getTextContent = ({
  childNodes,
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

function placeholdersToSpans(
  part: string,
  index: number
): string | JSX.Element {
  const isPlaceholder = index % 2 !== 0;
  if (!isPlaceholder) return part;
  return (
    <span
      data-is-placeholder
      onClick={moveCursorToWordStart}
      className={styles.Placeholder}
    >
      {/* Using a JSX expression to have only one child node,
          this allow moveCursorToWordStart to works properly */}
      {`[${part}]`}
    </span>
  );
}

export const placeholderRegExp = /\[([^[\]]*)\]/g;

function replacePlaceholdersForSpans(textWithPlaceholders: string) {
  return textWithPlaceholders.split(placeholderRegExp).map(placeholdersToSpans);
}

export const getPlaceholders = (text: string) => text?.match(placeholderRegExp);

type TextInputWithPlaceholdersProps = HTMLProps<HTMLDivElement> & {
  placeholder?: string;
  value: string;
  className?: string;
};

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
