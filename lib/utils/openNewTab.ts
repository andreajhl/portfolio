function openNewTab(url: string) {
  try {
    window?.open?.(url);
  } catch (error) {
    // Safari isn't supporting window.open, so fall back to anchor tag.
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.click();
    a.remove();
  }
}

export default openNewTab;
