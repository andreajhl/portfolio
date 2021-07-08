import { useWindow } from "./useWindow";

export function IsMobile() {
  const userAgent = useWindow()?.navigator?.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  return isMobile;
}
