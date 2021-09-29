import { useState } from "react";

/**
 * It return a useState dispatcher that triggers re-render in the component where the hook is called.
 * Use only when children doesn't re-render the parent properly.
 * NOTE: Don't use outside an useEffect or may cause infinity re-renders. Try to called only once per state change.
 */
function useForceUpdate() {
  return useState()[1];
}

export default useForceUpdate;
