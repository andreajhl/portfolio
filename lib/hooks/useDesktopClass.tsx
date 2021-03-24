import { useEffect } from "react";

export function useDesktopClass(isMobile: boolean) {
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add("desktop");
    return () => {
      document.documentElement.classList.remove("desktop");
    };
  }, []);
}
