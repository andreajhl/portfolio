export function checkCookie() {
  let cookieEnabled = window?.navigator?.cookieEnabled;
  if (!cookieEnabled) {
    document.cookie = "testcookie";
    cookieEnabled = document.cookie.indexOf("testcookie") != -1;
  }
  return cookieEnabled;
}
