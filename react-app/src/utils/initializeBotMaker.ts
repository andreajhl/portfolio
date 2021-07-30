const BOTMAKER_WEB_CHAT_BASE_URL = "https://go.botmaker.com/rest/webchat/p";

const SCRIPT_SRCS_BY_LANG = {
  es: `${BOTMAKER_WEB_CHAT_BASE_URL}/doBK198kWI1c/init.js`,
  en: `${BOTMAKER_WEB_CHAT_BASE_URL}/doBK198kWI1c/init.js`,
  pt: `${BOTMAKER_WEB_CHAT_BASE_URL}/0AXNVLQ1FB/init.js`,
};

const initializeBotMaker = (document: Document, locale = "es") => {
  if (!document) {
    throw new TypeError("The arg 'document' is required");
  }
  if (document.querySelector(`script[src^="${BOTMAKER_WEB_CHAT_BASE_URL}"]`)) {
    return;
  }
  const scriptSrc = SCRIPT_SRCS_BY_LANG[locale] || SCRIPT_SRCS_BY_LANG.es;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = scriptSrc;
  document.body.appendChild(script);
};

export default initializeBotMaker;
