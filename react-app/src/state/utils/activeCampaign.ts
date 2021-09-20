/**
 * Append a <footer /> with the ActiveCampaign script loader to ensure that works properly.
 * The docs said that the code should be "in the footer of your site" to work.
 * In _document page you can't render anything outside the <body />.
 */
function initializeActiveCampaign() {
  try {
    const scriptLoader = document.createElement("script");
    scriptLoader.innerHTML = `(function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");vgo('setAccount', '800641571');vgo('setTrackByDefault', true);vgo('process');`;
    const footer = document.createElement("footer");
    footer.append(scriptLoader);
    document.documentElement.append(footer);
  } catch (error) {
    console.warn("Error initializing ActiveCampaign:", error?.toString?.());
  }
}

export { initializeActiveCampaign };
