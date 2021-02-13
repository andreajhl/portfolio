const getCookie = (cookieName: string): String | undefined => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  return cookieArray
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(name))
    ?.split("=")?.[1];
};

export default getCookie;
