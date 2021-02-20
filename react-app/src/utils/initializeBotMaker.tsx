const initializeBotMaker = (document: Document) => {
  if (!document) {
    throw new TypeError("The arg 'document' is required");
  }
  const scriptSrc =
    "https://go.botmaker.com/rest/webchat/p/doBK198kWI1c/init.js";
  if (document.querySelector(`script[src="${scriptSrc}"`)) return;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = scriptSrc;
  document.body.appendChild(script);
};

export default initializeBotMaker;
