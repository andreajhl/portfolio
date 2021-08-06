import getWindow from "react-app/src/utils/getWindow";

const copyTextToClipboard = (text: string) => {
  getWindow()?.navigator?.clipboard?.writeText?.(text);
};

export default copyTextToClipboard;
