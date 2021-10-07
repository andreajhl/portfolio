import getWindow from "react-app/src/utils/getWindow";

function isSafariBrowser() {
  return /^((?!chrome|android).)*safari/i.test(
    getWindow()?.navigator?.userAgent
  );
}

export default isSafariBrowser;
