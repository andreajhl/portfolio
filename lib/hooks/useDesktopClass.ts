import { useEffect } from "react";

export function useDesktopClass(isDesktop: boolean) {
  useEffect(() => {
    if (!isDesktop) return;
    document.documentElement.classList.add("desktop");
    return () => {
      document.documentElement.classList.remove("desktop");
    };
  }, []);
}
