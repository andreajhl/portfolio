import { useEffect } from "react";

const getErrorsKeys = (errors: { [key: string]: string }) =>
  Object.entries(errors)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);

// Based on this package: https://www.npmjs.com/package/formik-error-focus
function useErrorFocus(errors: { [key: string]: string }) {
  useEffect(() => {
    const errorKeys = getErrorsKeys(errors);
    if (errorKeys.length < 1) return;
    const firstError = errorKeys[0];
    const selector = `[name="${firstError}"]`;
    const fallbackSelector = `[data-error-key="${firstError}"]`;
    const errorElement: HTMLElement | null =
      document.querySelector(selector) ||
      document.querySelector(fallbackSelector);

    if (!errorElement) return;
    errorElement?.focus?.();
  }, [errors]);
}

export default useErrorFocus;
