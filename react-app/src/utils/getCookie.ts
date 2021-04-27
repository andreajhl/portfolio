import getWindow from "./getWindow";

const getCookie = (
  cookieName: string,
  cookiesString = getWindow().document.cookie
): string | undefined => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(cookiesString);
  const cookieArray = decodedCookie.split(";");
  return cookieArray
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(name))
    ?.split?.("=")?.[1];
};

export default getCookie;
