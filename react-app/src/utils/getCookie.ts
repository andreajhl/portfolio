import getWindow from "./getWindow";

const getCookie = (cookieName: string): string | undefined => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(getWindow().document.cookie);
  const cookieArray = decodedCookie.split(";");
  return cookieArray
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(name))
    ?.split?.("=")?.[1];
};

export default getCookie;
